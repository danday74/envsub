// expect sinon
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

// others
const del = require('del');
const envsub = require(appRoot + '/index');
const fs = require('fs');

let TestImports = {
  expect,
  sinon,
  del,
  envsub,
  fs
};

module.exports = TestImports;
