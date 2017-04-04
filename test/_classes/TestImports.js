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
const cfg = require(appRoot + '/main.config');
const envsub = require(appRoot + '/lib/index').envsub;
const envsubh = require(appRoot + '/lib/index').envsubh;
const LogDiff = require(appRoot + '/LogDiff');

let TestImports = {
  expect,
  sinon,
  del,
  fs,
  using,
  cfg,
  envsub,
  envsubh,
  LogDiff
};

module.exports = TestImports;
