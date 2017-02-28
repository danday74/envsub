const envsub = require('../index');

envsub('waalaalaa').then((envobj) => {
  console.log(`wrote ${envobj.outputContents} to ${envobj.outputFile}`);
}).catch((err) => {
  console.error(err.message);
});
