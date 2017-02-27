#!/usr/bin/env node

const envsub = require('./index');

if (process.argv.length < 3) {
  console.error('input and output file args required');
  process.exit(1);
}

let inFile = process.argv[2];
let outFile = (process.argv.length > 3) ? process.argv[3] : null;

envsub(inFile, outFile);
