const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeCpp = () => {
  // const jobId = path.basename(filepath).split(".")[0];
  const usercode = path.join(__dirname,'/usercode.c');
  const testinput = path.join(__dirname,'/input.txt');
  const testoutput = path.join(__dirname,'/output.txt');
  const outPath = path.join(__dirname, '/useroutput.txt');

  return new Promise((resolve, reject) => {
    exec(
      `gcc ${usercode} && ./a.out`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeCpp,
};