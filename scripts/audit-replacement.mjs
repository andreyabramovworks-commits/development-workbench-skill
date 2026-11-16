import fs from 'node:fs';
import path from 'node:path';
import {args,listFiles,relative} from './project-files.mjs';

const flags=args(process.argv.slice(2));
if(flags.has('help')||!flags.has('project')||!flags.has('old')){
  console.log('Usage: node audit-replacement.mjs --project PATH --old TEXT [--old TEXT ...] [--json]');
  console.log('Searches tracked source-like files for literal legacy names or paths. Read each match before removal.');
  process.exit(flags.has('help')?0:2);
}
const root=path.resolve(String(flags.get('project')));
const terms=[].concat(flags.get('old')).map(String).filter(Boolean);
if(!fs.existsSync(root)||!fs.statSync(root).isDirectory())throw Error('Project directory not found');
const matches=[];
let checked=0;
for(const file of listFiles(root)){
  if(fs.statSync(file).size>2_000_000)continue;
  checked++;
  const lines=fs.readFileSync(file,'utf8').split(/\r?\n/);
  lines.forEach((line,index)=>{
    for(const term of terms){
      if(line.includes(term))matches.push({file:relative(root,file),line:index+1,term,text:line.trim().slice(0,240)});
    }
  });
}
const report={files_checked:checked,terms,matches:matches.length,occurrences:matches};
console.log(flags.has('json')?JSON.stringify(report,null,2):[
  `Checked ${checked} files; ${matches.length} legacy references`,
  ...matches.map(x=>`${x.file}:${x.line} [${x.term}] ${x.text}`)
].join('\n'));
if(matches.length)process.exitCode=1;
