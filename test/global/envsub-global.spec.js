const Imp = require('../_classes/TestImports');
const MY_TEMPLATE_FILE = `${__dirname}/templateFile`;
const MY_OUTPUT_FILE = `${__dirname}/outputFile`;

describe('envsub global', () => {

  let sandbox;

  before(() => {
    process.env.MY_NAME = 'Daniel';
  });

  beforeEach(() => {
    sandbox = Imp.sinon.sandbox.create();
    sandbox.stub(process, 'exit', () => {
    });
    sandbox.stub(console, 'error', () => {
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  after((done) => {
    Imp.del([`${__dirname}/outputFile*`, `${__dirname}/templateFile*`, `!${__dirname}/templateFile`]).then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

  let verifyEnvObj = (envobj, templateFile, outputFile) => {
    Imp.expect(envobj.templateContents).to.eql('xxx{{ MY_NAME }}xxx\n');
    Imp.expect(envobj.templateFile).to.eql(templateFile);
    Imp.expect(envobj.outputContents).to.eql('xxxDanielxxx\n');
    Imp.expect(envobj.outputFile).to.eql(outputFile);
  };

  it('should substitute env vars in template file and write to output file', (done) => {

    let templateFile = MY_TEMPLATE_FILE;
    let outputFile = MY_OUTPUT_FILE;

    Imp.envsub(templateFile, outputFile, true).then((envobj) => {
      verifyEnvObj(envobj, templateFile, outputFile);
      Imp.expect(process.exit).to.have.been.calledWith(0);
      // noinspection BadExpressionStatementJS
      Imp.expect(console.error).not.to.have.been.called;
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('should substitute env vars in template file and overwrite template file where one arg is given', (done) => {

    let templateFile = `${__dirname}/templateFile2`;

    // Create template file
    Imp.fs.writeFileSync(templateFile, Imp.fs.readFileSync(MY_TEMPLATE_FILE));

    Imp.envsub(templateFile, null, true).then((envobj) => {
      verifyEnvObj(envobj, templateFile, templateFile);
      Imp.expect(process.exit).to.have.been.calledWith(0);
      // noinspection BadExpressionStatementJS
      Imp.expect(console.error).not.to.have.been.called;
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it('should reject where no args are given', (done) => {

    Imp.envsub(null, null, true).then(() => {
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
    let outputFile = MY_OUTPUT_FILE;

    Imp.envsub(templateFile, outputFile, true).then(() => {
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
