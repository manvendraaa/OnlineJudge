const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const Problem = require('./models/problem');

const makeFile = async (code,id) => {
  const usercode = path.join(__dirname,'/usercode.c');
  const testinput = path.join(__dirname,'/input.txt');
  const testoutput = path.join(__dirname,'/output.txt');

  await fs.writeFileSync(usercode, code);

  let problem = await Problem.findById(id);  
  await fs.writeFileSync(testinput, problem.input );
  await fs.writeFileSync(testoutput, problem.output );
  return;
};

module.exports = {
  makeFile,
};