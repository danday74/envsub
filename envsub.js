#!/usr/bin/env node

const envsub = require('./index');

let templateFile = (process.argv.length > 2) ? process.argv[2] : null;
let outputFile = (process.argv.length > 3) ? process.argv[3] : null;

envsub(templateFile, outputFile, true);
