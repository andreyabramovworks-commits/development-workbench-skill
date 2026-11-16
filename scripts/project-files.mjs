import fs from 'node:fs';
import path from 'node:path';

const ignored=new Set(['.git','node_modules','.venv','venv','dist','build','coverage','.next','__pycache__','__workbench__']);
const extensions=new Set(['.js','.jsx','.mjs','.cjs','.ts','.tsx','.py','.json','.css','.scss','.html','.md']);

export function listFiles(root,options={}){
  const result=[];
  const walk=dir=>{
    for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
      if(ignored.has(entry.name)||entry.name.startsWith('.workbench'))continue;
      const absolute=path.join(dir,entry.name);
      if(entry.isDirectory())walk(absolute);
      else if(entry.isFile()&&extensions.has(path.extname(entry.name))&&(!options.skip||!options.skip(absolute))){
        result.push(absolute);
      }
    }
  };
  walk(root);
  return result;
}

export function args(argv){
  const flags=new Map();
  for(let i=0;i<argv.length;i++){
    const token=argv[i];
    if(!token.startsWith('--'))throw Error('Unexpected argument: '+token);
    const key=token.slice(2);
    const value=argv[i+1]&&!argv[i+1].startsWith('--')?argv[++i]:true;
    const old=flags.get(key);
    flags.set(key,old===undefined?value:Array.isArray(old)?[...old,value]:[old,value]);
  }
  return flags;
}

export function relative(root,file){return path.relative(root,file).replaceAll('\\','/');}
