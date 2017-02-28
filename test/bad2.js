const envsub = require('../index');

envsub().then((envobj) => {
  console.log(`wrote ${envobj.outputContents} to ${envobj.outputFile}`);
}).catch((err) => {
  console.error(err.message);
});
