const command = 'envsubh';
const commonE2eTests = require('../_classes/commonE2eTests');
const commonTests = require('../_classes/commonTests');
const Imp = require('../_classes/TestImports');
const optionsTestObjs = require('../_classes/optionsTestObjs')[command];
const Tmp = require('../_classes/templateFiles')[command];

describe(`${command} global`, () => {

  let sandbox;

  before(() => {
    process.env.MY_NAME = 'Daniel';
  });

  beforeEach(() => {
    sandbox = Imp.sinon.sandbox.create();
    sandbox.stub(console, 'error').callsFake(() => {
    });
    sandbox.stub(console, 'warn').callsFake(() => {
    });
    sandbox.stub(process, 'exit').callsFake(() => {
    });
    sandbox.spy(Imp.LogDiff, 'logDiff');
  });

  afterEach(() => {
    sandbox.restore();
  });

  after((done) => {
    Imp.del([Tmp.OUTPUT_FILE, Tmp.TEMP_TEMPLATE_FILE]).then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

  commonTests.success(Imp[command], Tmp, true);
  commonTests.options(Imp[command], Tmp, true, optionsTestObjs);
  commonTests.failure(Imp[command], Tmp, true);

  commonE2eTests.success(command, Tmp);
  commonE2eTests.flags(command, Tmp, optionsTestObjs);
  commonE2eTests.failure(command, Tmp);

});
