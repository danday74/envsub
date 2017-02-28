const envsub = require('../index');

envsub('testTemplateFile', 'testOutputFileGood').then((envobj) => {
  console.log(`wrote ${envobj.outputContents} to ${envobj.outputFile}`);
}).catch((err) => {
  console.error(err.message);
});
