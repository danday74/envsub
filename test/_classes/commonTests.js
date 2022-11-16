const Imp = require('./TestImports');
const spyables = require('../../js/spyables');

let success = (command, Tmp, cli) => {
  
  describe('Success', () => {

    let sandbox;

    beforeEach(() => {
      sandbox = Imp.sinon.createSandbox();
      sandbox.stub(spyables, 'writeToStdout').callsFake(() => {
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    let verifyEnvObj = (envobj, templateFile, outputFile, outputContents, cli) => {
      Imp.expect(envobj.templateFile).to.eql(templateFile);
      Imp.expect(envobj.outputFile).to.eql(outputFile);
      Imp.expect(envobj.outputContents).to.eql(outputContents);
      if (cli) {
        Imp.expect(process.exit).to.have.been.calledWith(0);
        // noinspection BadExpressionStatementJS
        Imp.expect(console.error).not.to.have.been.called;
      }
    };

    it('should substitute env vars in template file and write to output file', (done) => {

      let templateFile = Tmp.MY_TEMPLATE_FILE;
      let outputFile = Tmp.OUTPUT_FILE;
      let outputContents = Tmp.MY_TEMPLATE_FILE_EXPECTED;

      command({templateFile, outputFile, cli}).then((envobj) => {
        verifyEnvObj(envobj, templateFile, outputFile, outputContents, cli);
        // noinspection BadExpressionStatementJS
        Imp.expect(spyables.writeToStdout).not.to.have.been.called;
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('should substitute env vars in template file and write to stdout', (done) => {

      let templateFile = Tmp.MY_TEMPLATE_FILE;
      let outputFile = 'stdout';
      let outputContents = Tmp.MY_TEMPLATE_FILE_EXPECTED;

      command({templateFile, outputFile, cli}).then((envobj) => {
        verifyEnvObj(envobj, templateFile, outputFile, outputContents, cli);
        // noinspection BadExpressionStatementJS
        Imp.expect(spyables.writeToStdout).to.have.been.called;
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('should substitute env vars in template file and overwrite template file where no output file is given', (done) => {

      let templateFile = Tmp.TEMP_TEMPLATE_FILE;
      let outputContents = Tmp.MY_TEMPLATE_FILE_EXPECTED;

      // Create template file
      Imp.fs.writeFileSync(templateFile, Imp.fs.readFileSync(Tmp.MY_TEMPLATE_FILE));

      command({templateFile, cli}).then((envobj) => {
        verifyEnvObj(envobj, templateFile, templateFile, outputContents, cli);
        // noinspection BadExpressionStatementJS
        Imp.expect(spyables.writeToStdout).not.to.have.been.called;
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
};

let withDefaultValues = (command, Tmp, cli) => {
  describe('Success with default values', () => {

    let sandbox;

    beforeEach(() => {
      sandbox = Imp.sinon.createSandbox();
      sandbox.stub(spyables, 'writeToStdout').callsFake(() => {
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    let verifyEnvObj = (envobj, templateFile, outputFile, outputContents, cli) => {
      Imp.expect(envobj.templateFile).to.eql(templateFile);
      Imp.expect(envobj.outputFile).to.eql(outputFile);
      Imp.expect(envobj.outputContents).to.eql(outputContents);
      if (cli) {
        Imp.expect(process.exit).to.have.been.calledWith(0);
        // noinspection BadExpressionStatementJS
        Imp.expect(console.error).not.to.have.been.called;
      }
    };

    it('should substitute env vars in template file with default values and write to output file', (done) => {
      let templateFile = Tmp.MY_TEMPLATE_FILE_WITH_DEFAULT_VALUE;
      let outputFile = Tmp.OUTPUT_FILE;
      let outputContents = Tmp.MY_TEMPLATE_FILE_WITH_DEFAULT_VALUE_EXPECTED;

      command({templateFile, outputFile, cli}).then((envobj) => {
        verifyEnvObj(envobj, templateFile, outputFile, outputContents, cli);
        // noinspection BadExpressionStatementJS
        Imp.expect(spyables.writeToStdout).not.to.have.been.called;
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('should substitute env vars in template file with default values and write to stdout', (done) => {

      let templateFile = Tmp.MY_TEMPLATE_FILE_WITH_DEFAULT_VALUE;
      let outputFile = 'stdout';
      let outputContents = Tmp.MY_TEMPLATE_FILE_WITH_DEFAULT_VALUE_EXPECTED;

      command({templateFile, outputFile, cli}).then((envobj) => {
        verifyEnvObj(envobj, templateFile, outputFile, outputContents, cli);
        // noinspection BadExpressionStatementJS
        Imp.expect(spyables.writeToStdout).to.have.been.called;
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('should substitute env vars in template file with default values and overwrite template file where no output file is given', (done) => {

      let templateFile = Tmp.TEMP_TEMPLATE_FILE_WITH_DEFAULT_VALUE;
      let outputContents = Tmp.MY_TEMPLATE_FILE_WITH_DEFAULT_VALUE_EXPECTED;

      // Create template file
      Imp.fs.writeFileSync(templateFile, Imp.fs.readFileSync(Tmp.MY_TEMPLATE_FILE_WITH_DEFAULT_VALUE));

      command({templateFile, cli}).then((envobj) => {
        verifyEnvObj(envobj, templateFile, templateFile, outputContents, cli);
        // noinspection BadExpressionStatementJS
        Imp.expect(spyables.writeToStdout).not.to.have.been.called;
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
};

let options = (command, Tmp, cli, optionsTestObjs) => {

  describe('Options', () => {

    Imp.using(optionsTestObjs, () => {

      it('{testName}', (testObj, done) => {

        if (testObj.preFunc) testObj.preFunc();

        let templateFile = testObj.templateFile;
        let outputFile = Tmp.OUTPUT_FILE;
        let options = testObj.options;

        command({templateFile, outputFile, options, cli}).then((envobj) => {
          Imp.expect(envobj.templateFile).to.eql(templateFile);
          Imp.expect(envobj.outputFile).to.eql(outputFile);
          if (testObj.outputContents) Imp.expect(envobj.outputContents).to.eql(testObj.outputContents);
          if (cli) {
            Imp.expect(process.exit).to.have.been.calledWith(0);
            // noinspection BadExpressionStatementJS
            Imp.expect(console.error).not.to.have.been.called;
          }
          if (testObj.postFunc) testObj.postFunc();
          done();
        }).catch((err) => {
          done(err);
        });
      });
    });
  });
};

let failure = (command, Tmp, cli) => {

  describe('Failure', () => {

    it('should reject where template file is not given', (done) => {

      command({cli}).then(() => {
        done(Error('Did not reject'));
      }).catch((err) => {
        Imp.expect(err.message).to.contain('missing args');
        if (cli) {
          Imp.expect(process.exit).to.have.been.calledWith(1);
          Imp.expect(console.error).to.have.been.calledWithMatch(/missing args/);
        }
        done();
      });
    });

    it('should reject where template file does not exist', (done) => {

      let templateFile = Tmp.NO_TEMPLATE_FILE;
      let outputFile = Tmp.OUTPUT_FILE;

      command({templateFile, outputFile, cli}).then(() => {
        done(Error('Did not reject'));
      }).catch((err) => {
        Imp.expect(err.code).to.eql('ENOENT');
        Imp.expect(err.path).to.match(/noTemplateFile$/);
        if (cli) {
          Imp.expect(process.exit).to.have.been.calledWith(1);
          Imp.expect(console.error).to.have.been.calledWithMatch(/ENOENT/);
        }
        done();
      });
    });
  });
};

module.exports = {
  success,
  withDefaultValues,
  options,
  failure
};
