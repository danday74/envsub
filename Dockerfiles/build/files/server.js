// noinspection NpmUsedModulesInstalled
let express = require('express');
let app = express();

app.use((req, res, next) => {
  console.log(req.protocol.toUpperCase(), req.method, req.url);
  return next();
});

app.use(express.static('public'));

let listener = app.listen(8080, () => {
  console.log('Server listening on port', listener.address().port);
});
