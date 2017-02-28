#!/usr/bin/env node

const envsub = require('../index');

console.log('writing to outputFile1 with', process.env.COMPUTERNAME);
envsub('testTemplateFile', 'testOutputFile1').then(() => {

  process.env.COMPUTERNAME = 'COOLIO';
  console.log('writing to outputFile2 with', process.env.COMPUTERNAME);
  return envsub('testTemplateFile', 'testOutputFile2');
}).then(() => {

  console.log('testing missing args');
  return envsub();
}).then(() => {

  console.log('SOMETHING IS WRONG IF THIS LINE OF CODE IS EXECUTED');
}).catch((err) => {

  console.log(err.message);
  console.log('testing non existent template');
  return envsub('waalaalaa');
}).then(() => {

  console.log('SOMETHING IS WRONG IF THIS LINE OF CODE IS EXECUTED');
}).catch((err) => {

  console.log(err.message);
  console.log('done');
});
