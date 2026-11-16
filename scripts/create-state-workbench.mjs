import fs from 'node:fs';
import path from 'node:path';
import {args,relative} from './project-files.mjs';

const flags=args(process.argv.slice(2));
if(flags.has('help')||!flags.has('project')||!flags.has('name')||(!flags.has('config')&&!flags.has('remove'))){
  console.log('Usage: node create-state-workbench.mjs --project PATH --name SLUG --config states.json');
  console.log('Remove generated files: node create-state-workbench.mjs --project PATH --name SLUG --remove');
  process.exit(flags.has('help')?0:2);
}
const root=path.resolve(String(flags.get('project')));
const name=String(flags.get('name'));
if(!/^[a-z0-9][a-z0-9-]*$/.test(name))throw Error('Name must be a lowercase slug');
const packageFile=path.join(root,'package.json');
if(!fs.existsSync(packageFile))throw Error('Project package.json not found');
const pkg=JSON.parse(fs.readFileSync(packageFile,'utf8'));
const deps={...pkg.dependencies,...pkg.devDependencies};
if(!deps.react||!deps['react-dom']||!deps.vite)throw Error('This workbench requires an existing React + Vite project');
const base=path.join(root,'src','__workbench__');
const out=path.join(base,name);
if(!out.startsWith(base+path.sep))throw Error('Unsafe output path');
const marker=path.join(out,'.development-workbench-generated');
if(flags.has('remove')){
  if(!fs.existsSync(marker))throw Error('Refusing removal: generated marker is missing');
  fs.rmSync(out,{recursive:true,force:true});
  console.log('Removed '+relative(root,out));
  process.exit(0);
}
const configPath=path.resolve(String(flags.get('config')));
const config=JSON.parse(fs.readFileSync(configPath,'utf8'));
if(!config.component||!Array.isArray(config.states)||!config.states.length)throw Error('Config requires component and non-empty states');
if(config.export&&config.export!=='default'&&!/^[A-Za-z_$][\w$]*$/.test(config.export))throw Error('Invalid named export');
const component=path.resolve(root,config.component);
if(!component.startsWith(root+path.sep)||!fs.existsSync(component))throw Error('Component must be an existing file inside the project');
for(const state of config.states){
  if(!state.name||typeof state.name!=='string'||!state.props||typeof state.props!=='object'||Array.isArray(state.props))throw Error('Each state needs name and props object');
}
if(fs.existsSync(out))throw Error('Output exists: '+out+'; use a different name or remove generated files');
fs.mkdirSync(out,{recursive:true});
const spec=relative(out,component);
const importPath=spec.startsWith('.')?spec:'./'+spec;
const named=config.export&&config.export!=='default';
const importLine=named?`import { ${config.export} as PreviewComponent } from ${JSON.stringify(importPath)};`:`import PreviewComponent from ${JSON.stringify(importPath)};`;
const projectImport=value=>{
  const absolute=path.resolve(root,value);
  if(!absolute.startsWith(root+path.sep)||!fs.existsSync(absolute))throw Error('Import not found inside project: '+value);
  const rel=relative(out,absolute);
  return JSON.stringify(rel.startsWith('.')?rel:'./'+rel);
};
const styleImports=[].concat(config.styles||[]).map(x=>`import ${projectImport(x)};`).join('\n');
const wrapperImport=config.wrapper?`import PreviewWrapper from ${projectImport(config.wrapper)};`:'';
const preview=config.wrapper?'<PreviewWrapper><PreviewComponent {...state.props}/></PreviewWrapper>':'<PreviewComponent {...state.props}/>';
const source=`import React from 'react';
import { createRoot } from 'react-dom/client';
${importLine}
${wrapperImport}
${styleImports}
import './workbench.css';

const states = ${JSON.stringify(config.states,null,2)};
function Workbench(){
  const [current,setCurrent]=React.useState(0);
  const state=states[current];
  return <div className="wb-shell">
    <aside className="wb-controls"><h1>${name}</h1><p>Состояния настоящего компонента</p>
      {states.map((item,index)=><button key={item.name} aria-pressed={current===index} onClick={()=>setCurrent(index)}>{item.name}</button>)}
    </aside>
    <main className="wb-stage"><h2>{state.name}</h2>${preview}</main>
  </div>;
}
createRoot(document.getElementById('root')!).render(<Workbench/>);
`;
fs.writeFileSync(path.join(out,'main.tsx'),source);
fs.writeFileSync(path.join(out,'index.html'),`<!doctype html><html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>States: ${name}</title></head><body><div id="root"></div><script type="module" src="./main.tsx"></script></body></html>\n`);
fs.writeFileSync(path.join(out,'workbench.css'),`.wb-shell{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:100vh;font:14px system-ui}.wb-controls{padding:18px;border-right:1px solid #ddd}.wb-controls button{display:block;width:100%;text-align:left;padding:8px;margin:4px 0}.wb-controls button[aria-pressed=true]{font-weight:700}.wb-stage{padding:24px}.wb-stage h2{font-size:16px}@media(max-width:700px){.wb-shell{display:block}.wb-controls{border-right:0;border-bottom:1px solid #ddd}}\n`);
fs.writeFileSync(marker,'Generated by development-workbench-skill.\n');
console.log('Created '+relative(root,out)+'/index.html');
console.log('Run the project Vite server, then open /src/__workbench__/'+name+'/index.html');
