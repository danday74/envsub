// expect sinon
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

// others
const del = require('del');
const fs = require('fs');
const using = require('data-driven');

// custom
const ArgV = require(appRoot + '/bin/ArgV');
const envsub = require(appRoot + '/envsub');
const envsubh = require(appRoot + '/envsubh');
const LogDiff = require(appRoot + '/js/LogDiff');

const TestImports = {
  expect,
  sinon,
  del,
  fs,
  using,
  ArgV,
  envsub,
  envsubh,
  LogDiff
};

module.exports = TestImports;
