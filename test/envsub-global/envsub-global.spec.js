const Imp = require('../_classes/TestImports');
const Tmp = require('../_classes/templateFiles').envsub;
const optionsTestObjs = require('../_classes/optionsTestObjs');

describe('envsub global', () => {

  let sandbox;

  before(() => {
    process.env.MY_NAME = 'Daniel';
  });

  beforeEach(() => {
    sandbox = Imp.sinon.sandbox.create();
    sandbox.stub(console, 'error', () => {
    });
    sandbox.stub(console, 'warn', () => {
    });
    sandbox.stub(process, 'exit', () => {
    });
    sandbox.spy(Imp.LogDiff, 'logDiff');
  });

  afterEach(() => {
    sandbox.restore();
  });

  after((done) => {
    Imp.del([`${__dirname}/outputFile*`, `${__dirname}/tempTemplateFile*`]).then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

  describe('Success', () => {

    let verifyEnvObj = (envobj, templateFile, outputFile) => {
      Imp.expect(envobj.templateFile).to.eql(templateFile);
      Imp.expect(envobj.outputContents).to.eql(Tmp.MY_TEMPLATE_FILE_EXPECTED);
      Imp.expect(envobj.outputFile).to.eql(outputFile);
    };

    it('should substitute env vars in template file and write to output file', (done) => {

      let templateFile = Tmp.MY_TEMPLATE_FILE;
      let outputFile = Tmp.OUTPUT_FILE;
      let options = {};

      Imp.envsub({templateFile, outputFile, options, cli: true}).then((envobj) => {
        verifyEnvObj(envobj, templateFile, outputFile);
        Imp.expect(process.exit).to.have.been.calledWith(0);
        // noinspection BadExpressionStatementJS
        Imp.expect(console.error).not.to.have.been.called;
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('should substitute env vars in template file and overwrite template file where no output file is given', (done) => {

      let templateFile = `${__dirname}/tempTemplateFile`;
      let options = {};

      // Create template file
      Imp.fs.writeFileSync(templateFile, Imp.fs.readFileSync(Tmp.MY_TEMPLATE_FILE));

      Imp.envsub({templateFile, options, cli: true}).then((envobj) => {
        verifyEnvObj(envobj, templateFile, templateFile);
        Imp.expect(process.exit).to.have.been.calledWith(0);
        // noinspection BadExpressionStatementJS
        Imp.expect(console.error).not.to.have.been.called;
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe('Options', () => {

    Imp.using(optionsTestObjs, () => {

      it('{testName}', (testObj, done) => {

        if (testObj.preFunc) testObj.preFunc();

        let templateFile = testObj.templateFile;
        let outputFile = Tmp.OUTPUT_FILE;
        let options = testObj.options;

        Imp.envsub({templateFile, outputFile, options, cli: true}).then((envobj) => {
          Imp.expect(envobj.templateFile).to.eql(templateFile);
          Imp.expect(envobj.outputFile).to.eql(outputFile);
          if (testObj.outputContents) Imp.expect(envobj.outputContents).to.eql(testObj.outputContents);
          Imp.expect(process.exit).to.have.been.calledWith(0);
          // noinspection BadExpressionStatementJS
          Imp.expect(console.error).not.to.have.been.called;
          if (testObj.postFunc) testObj.postFunc();
          done();
        }).catch((err) => {
          done(err);
        });
      });
    });
  });

  describe('Failure', () => {

    it('should reject where template file is not given', (done) => {

      let options = {};

      Imp.envsub({options, cli: true}).then(() => {
        done(Error('Did not reject'));
      }).catch((err) => {
        Imp.expect(err.message).to.contain('missing args');
        Imp.expect(process.exit).to.have.been.calledWith(1);
        Imp.expect(console.error).to.have.been.calledWithMatch(/missing args/);
        done();
      });
    });

    it('should reject where template file does not exist', (done) => {

      let templateFile = `${__dirname}/noTemplateFile`;
      let outputFile = Tmp.OUTPUT_FILE;
      let options = {};

      Imp.envsub({templateFile, outputFile, options, cli: true}).then(() => {
        done(Error('Did not reject'));
      }).catch((err) => {
        Imp.expect(err.code).to.eql('ENOENT');
        Imp.expect(err.path).to.match(/noTemplateFile$/);
        Imp.expect(process.exit).to.have.been.calledWith(1);
        Imp.expect(console.error).to.have.been.calledWithMatch(/ENOENT/);
        done();
      });
    });
  });
});
