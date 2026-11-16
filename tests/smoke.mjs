import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const skill=path.resolve(import.meta.dirname,'..');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'development-workbench-smoke-'));
const write=(name,content)=>{const file=path.join(root,name);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,content);};
const run=(name,...params)=>spawnSync(process.execPath,[path.join(skill,'scripts',name),...params],{encoding:'utf8'});
try{
  write('package.json',JSON.stringify({dependencies:{react:'*','react-dom':'*',vite:'*'}}));
  write('src/features/course/index.ts','export const course = 1;');
  write('src/features/course/internal.ts','export const internal = 1;');
  write('src/features/test/useCourse.ts',"import {internal} from '../course/internal';\n");
  write('src/domain/rules.ts',"import {internal} from '../features/course/internal';\n");
  write('src/shared/ui.ts',"import {course} from '../features/course';\n");
  write('src/app/main.ts',"import {course} from '../features/course';\n");
  let check=run('check-boundaries.mjs','--project',root,'--json');
  assert.equal(check.status,1,check.stderr);
  const report=JSON.parse(check.stdout);
  assert.equal(report.violations,3);
  write('src/features/test/useCourse.ts',"import {course} from '../course';\n");
  write('src/domain/rules.ts','export const rule = 1;');
  write('src/shared/ui.ts','export const ui = 1;');
  check=run('check-boundaries.mjs','--project',root,'--json');
  assert.equal(check.status,0,check.stdout+check.stderr);
  write('src/app/legacy.ts','export const oldCourseHandler = 1;');
  let legacy=run('audit-replacement.mjs','--project',root,'--old','oldCourseHandler','--json');
  assert.equal(legacy.status,1);
  assert.equal(JSON.parse(legacy.stdout).matches,1);
  write('src/app/legacy.ts','export const newCourseHandler = 1;');
  legacy=run('audit-replacement.mjs','--project',root,'--old','oldCourseHandler','--json');
  assert.equal(legacy.status,0);
  write('src/features/course/Panel.tsx','export default function Panel(){return <div>Course</div>}');
  write('src/index.css','body{margin:0}');
  write('states.json',JSON.stringify({component:'src/features/course/Panel.tsx',states:[{name:'Normal',props:{title:'Course'}},{name:'Empty',props:{title:''}}],styles:['src/index.css']}));
  const workbench=run('create-state-workbench.mjs','--project',root,'--name','course-panel','--config',path.join(root,'states.json'));
  assert.equal(workbench.status,0,workbench.stderr);
  const generated=fs.readFileSync(path.join(root,'src/__workbench__/course-panel/main.tsx'),'utf8');
  assert.match(generated,/Panel\.tsx/);
  assert.match(generated,/Empty/);
  const removed=run('create-state-workbench.mjs','--project',root,'--name','course-panel','--remove');
  assert.equal(removed.status,0,removed.stderr);
  assert.equal(fs.existsSync(path.join(root,'src/__workbench__/course-panel')),false);
  console.log('Smoke checks passed: boundaries, replacement audit, state workbench create/remove');
}finally{
  fs.rmSync(root,{recursive:true,force:true});
}
