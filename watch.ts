import { spawn } from 'node:child_process';

['watch:js', 'watch:typecheck'].forEach((script) => {
  const childProcess = spawn('npm', ['run', script]);
  console.log(`${script}: pid=${childProcess.pid}`);
  childProcess.stdout.pipe(process.stdout);
});
