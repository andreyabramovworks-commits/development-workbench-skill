import fs from 'node:fs';
import path from 'node:path';
import {args,listFiles,relative} from './project-files.mjs';

const flags=args(process.argv.slice(2));
if(flags.has('help')||!flags.has('project')){
  console.log('Usage: node check-boundaries.mjs --project PATH [--source src] [--alias @/] [--json]');
  process.exit(flags.has('help')?0:2);
}
const root=path.resolve(String(flags.get('project')));
const source=path.resolve(root,String(flags.get('source')|| (fs.existsSync(path.join(root,'src'))?'src':'.')));
const alias=String(flags.get('alias')||'@/');
if(!fs.existsSync(source))throw Error('Source folder does not exist: '+source);
const files=listFiles(source).filter(f=>/\.(?:[cm]?[jt]sx?|py)$/.test(f));
const issues=[];
const owner=file=>{
  const p=relative(source,file).split('/');
  if(!['app','features','domain','shared'].includes(p[0]))return null;
  return {layer:p[0],feature:p[0]==='features'?p[1]:null};
};
const resolveImport=(file,spec)=>{
  if(spec.startsWith('.'))return path.resolve(path.dirname(file),spec);
  if(spec.startsWith(alias))return path.resolve(source,spec.slice(alias.length));
  if(spec.startsWith('src/'))return path.resolve(root,spec);
  return null;
};
for(const file of files){
  const from=owner(file);if(!from)continue;
  const code=fs.readFileSync(file,'utf8');
  const specs=[];
  if(file.endsWith('.py')){
    for(const m of code.matchAll(/^\s*(?:from|import)\s+((?:app|features|domain|shared)(?:\.[\w]+)*)/gm))specs.push(m[1].replaceAll('.','/'));
  }else{
    for(const m of code.matchAll(/\b(?:import|export)\s+(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]/g))specs.push(m[1]);
    for(const m of code.matchAll(/\b(?:import\s*\(|require\s*\()\s*['"]([^'"]+)['"]/g))specs.push(m[1]);
  }
  for(const spec of specs){
    const target=file.endsWith('.py')?path.resolve(source,spec):resolveImport(file,spec);
    if(!target)continue;
    const to=owner(target);if(!to)continue;
    let rule=null;
    if(from.layer==='shared'&&to.layer!=='shared')rule='shared must not depend on application or business layers';
    else if(from.layer==='domain'&&['features','app'].includes(to.layer))rule='domain must not depend on features or app';
    else if(from.layer==='features'&&to.layer==='app')rule='features must not depend on app';
    else if(from.layer==='features'&&to.layer==='features'&&from.feature!==to.feature){
      const suffix=relative(source,target).split('/').slice(2);
      if(!['','index','index.ts','index.tsx','index.js','index.jsx'].includes(suffix.join('/')))rule='cross-feature import must use the other feature public index';
    }
    if(rule)issues.push({file:relative(root,file),import:spec,rule});
  }
}
const report={files_checked:files.length,violations:issues.length,issues};
console.log(flags.has('json')?JSON.stringify(report,null,2):[
  `Checked ${files.length} files; ${issues.length} boundary violations`,
  ...issues.map(x=>`${x.file}: ${x.import} — ${x.rule}`)
].join('\n'));
if(issues.length)process.exitCode=1;
