const command = 'envsub';
const commonTests = require('../_classes/commonTests');
const Imp = require('../_classes/TestImports');
const optionsTestObjs = require('../_classes/optionsTestObjs')[command];
const Tmp = require('../_classes/templateFiles')[command];

describe(`${command} local`, () => {

  let sandbox;

  before(() => {
    process.env.MY_NAME = 'Daniel';
  });

  beforeEach(() => {
    sandbox = Imp.sinon.sandbox.create();
    sandbox.stub(console, 'warn').callsFake(() => {
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

  commonTests.success(Imp[command], Tmp, false);
  commonTests.options(Imp[command], Tmp, false, optionsTestObjs);
  commonTests.failure(Imp[command], Tmp, false);

});
