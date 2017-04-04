const Imp = require('../_classes/TestImports');
const Tmp = require('../_classes/templateFiles').envsubh;


describe('envsubh global', () => {

  let sandbox;

  before(() => {
    process.env.MY_NAME = 'Daniel';
  });

  beforeEach(() => {
    sandbox = Imp.sinon.sandbox.create();
    sandbox.stub(console, 'error', () => {
    });
    sandbox.stub(process, 'exit', () => {
    });
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

      Imp.envsubh({templateFile, outputFile, options, cli: true}).then((envobj) => {
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

      Imp.envsubh({templateFile, options, cli: true}).then((envobj) => {
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





























  describe('Failure', () => {

    it('should reject where template file is not given', (done) => {

      let options = {};

      Imp.envsubh({options, cli: true}).then(() => {
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

      Imp.envsubh({templateFile, outputFile, options, cli: true}).then(() => {
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
