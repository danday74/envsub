const readFileSync = require('fs').readFileSync;
const Imp = require('./TestImports');
const CLI_DELAY = 200;

let cacheClearAndGo = (command) => {
  delete require.cache[require.resolve('commander')];
  let commandPath = `${appRoot}/bin/${command}`;
  delete require.cache[require.resolve(commandPath)];
  require(commandPath);
};

let e2eSandbox;

beforeEach(() => {
  e2eSandbox = Imp.sinon.sandbox.create();
});

afterEach(() => {
  e2eSandbox.restore();
});

let success = (command, Tmp) => {

  describe('E2E success', () => {

    let verifyEnvObj = (outputFile) => {
      let actualContents = readFileSync(outputFile, 'utf8');
      let expectedContents = Tmp.MY_TEMPLATE_FILE_EXPECTED;
      Imp.expect(actualContents).to.equal(expectedContents);
      Imp.expect(process.exit).to.have.been.calledWith(0);
      // noinspection BadExpressionStatementJS
      Imp.expect(console.error).not.to.have.been.called;
    };

    it('should substitute env vars in template file and write to output file', (done) => {

      let templateFile = Tmp.MY_TEMPLATE_FILE;
      let outputFile = Tmp.OUTPUT_FILE;

      e2eSandbox.stub(Imp.ArgV, 'get').callsFake(() => {
        return ['node', 'irrelevant', templateFile, outputFile];
      });

      cacheClearAndGo(command);

      setTimeout(() => {
        verifyEnvObj(outputFile);
        done();
      }, CLI_DELAY);
    });

    it('should substitute env vars in template file and overwrite template file where no output file is given', (done) => {

      let templateFile = Tmp.TEMP_TEMPLATE_FILE;

      // Create template file
      Imp.fs.writeFileSync(templateFile, Imp.fs.readFileSync(Tmp.MY_TEMPLATE_FILE));

      e2eSandbox.stub(Imp.ArgV, 'get').callsFake(() => {
        return ['node', 'irrelevant', templateFile];
      });

      cacheClearAndGo(command);

      setTimeout(() => {
        verifyEnvObj(templateFile);
        done();
      }, CLI_DELAY);
    });
  });
};

let flags = (command, Tmp, optionsTestObjs) => {

  describe('E2E flags', () => {

    Imp.using(optionsTestObjs, () => {

      it('{testName}', (testObj, done) => {

        if (testObj.preFunc) testObj.preFunc();

        let templateFile = testObj.templateFile;
        let outputFile = Tmp.OUTPUT_FILE;

        e2eSandbox.stub(Imp.ArgV, 'get').callsFake(() => {
          return ['node', 'irrelevant', ...testObj.cli.flags, templateFile, outputFile];
        });

        cacheClearAndGo(command);

        setTimeout(() => {
          let expectedContents = testObj.outputContents;
          if (expectedContents) {
            let actualContents = readFileSync(outputFile, 'utf8');
            Imp.expect(actualContents).to.equal(expectedContents);
          }
          Imp.expect(process.exit).to.have.been.calledWith(0);
          // noinspection BadExpressionStatementJS
          Imp.expect(console.error).not.to.have.been.called;
          if (testObj.postFunc) testObj.postFunc();
          done();
        }, CLI_DELAY);
      });
    });
  });
};

let failure = (command, Tmp) => {

  describe('E2E failure', () => {

    it('should reject where template file is not given', (done) => {

      e2eSandbox.stub(Imp.ArgV, 'get').callsFake(() => {
        return ['node', 'irrelevant'];
      });

      cacheClearAndGo(command);

      setTimeout(() => {
        Imp.expect(process.exit).to.have.been.calledWith(1);
        Imp.expect(console.error).to.have.been.calledWithMatch(/missing args/);
        done();
      }, CLI_DELAY);
    });

    it('should reject where template file does not exist', (done) => {

      let templateFile = Tmp.NO_TEMPLATE_FILE;
      let outputFile = Tmp.OUTPUT_FILE;

      e2eSandbox.stub(Imp.ArgV, 'get').callsFake(() => {
        return ['node', 'irrelevant', templateFile, outputFile];
      });

      cacheClearAndGo(command);

      setTimeout(() => {
        Imp.expect(process.exit).to.have.been.calledWith(1);
        Imp.expect(console.error).to.have.been.calledWithMatch(/ENOENT/);
        done();
      }, CLI_DELAY);
    });
  });
};

module.exports = {
  success,
  flags,
  failure
};
