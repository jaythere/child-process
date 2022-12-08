const { spawn } = require("child_process");

const child = spawn("find", ["/"]);

child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});

child.on("error", (error) => console.log(`error: ${error.message}`));

child.on("exit", (code, signal) => {
  if (code) console.log(`Process exit -> code: ${code}`);
  if (signal) console.log(`Process killed -> signal: ${signal}`);
  console.log(`Success`);
});
