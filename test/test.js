const envsub = require('../index');
const appRoot = require('app-root-path');
const p = appRoot + '/test/';

// use existing env
envsub(p + 'testTemplateFile', p + 'testOutputFile1').then((envobj) => {

  console.log(`wrote ${envobj.outputContents} to ${envobj.outputFile}`);
  // use created env
  process.env.COMPUTERNAME = 'COOLIO';
  return envsub(p + 'testTemplateFile', p + 'testOutputFile2');
}).then((envobj) => {

  console.log(`wrote ${envobj.outputContents} to ${envobj.outputFile}`);
  // missing args
  return envsub();
}).then(() => {

  console.log('SOMETHING IS WRONG IF THIS LINE OF CODE IS EXECUTED');
}).catch((err) => {

  console.log(err.message);
  // non existent template
  return envsub(p + 'waalaalaa');
}).then(() => {

  console.log('SOMETHING IS WRONG IF THIS LINE OF CODE IS EXECUTED');
}).catch((err) => {

  console.log(err.message);
  console.log('done');
});
