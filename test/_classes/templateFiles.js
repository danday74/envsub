const readFileSync = require('fs').readFileSync;
const envsubDir = appRoot + '/test/envsub-global';
const envsubhDir = appRoot + '/test/envsubh-global';

const ENVFILE1 = `${envsubDir}/envFile1.env`;
const ENVFILE2 = `${envsubDir}/envFile2.env`;
const ENVFILE3 = `${envsubDir}/envFile3.env`;
const ENVFILE4 = `${envsubDir}/envFile4.env`;
const ENVFILE5 = `${envsubDir}/envFile5.env`;
const ENVFILE6 = `${envsubDir}/envFile6.env`;
const ENVFILE7 = `${envsubDir}/envFile7.env`;

const COMBINED_TEMPLATE_FILE = `${envsubDir}/templateFileCombined`;
const COMBINED_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileCombined_E`, 'utf8');

const ENV_TEMPLATE_FILE = `${envsubDir}/templateFileEnv`;
const ENV_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileEnv_E`, 'utf8');
const ENV_FILE_TEMPLATE_FILE = `${envsubDir}/templateFileEnvFile`;
const ENV_FILE_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileEnvFile_E`, 'utf8');
const ENV_INVALID_TEMPLATE_FILE = `${envsubDir}/templateFileEnvInvalid`;
const ENV_INVALID_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileEnvInvalid_E`, 'utf8');

const ENV_PROTECT_TEMPLATE_FILE = `${envsubDir}/templateFileEnvProtect`;
const ENV_PROTECT_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileEnvProtect_E`, 'utf8');

const PROTECT_TEMPLATE_FILE = `${envsubDir}/templateFileProtect`;
const PROTECT_OFF_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileProtectOff_E`, 'utf8');
const PROTECT_ON_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileProtectOn_E`, 'utf8');

const SYNTAX_TEMPLATE_FILE = `${envsubDir}/templateFileSyntax`;
const SYNTAX_DEFAULT_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileSyntaxDollarCurly_E`, 'utf8');
const SYNTAX_DOLLAR_BASIC_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileSyntaxDollarBasic_E`, 'utf8');
const SYNTAX_DOLLAR_BOTH_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileSyntaxDollarBoth_E`, 'utf8');
const SYNTAX_DOLLAR_CURLY_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileSyntaxDollarCurly_E`, 'utf8');
const SYNTAX_HANDLEBARS_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileSyntaxHandlebars_E`, 'utf8');

const SYSTEM_TEMPLATE_FILE = `${envsubDir}/templateFileSystem`;
const SYSTEM_OFF_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileSystemOff_E`, 'utf8');
const SYSTEM_ON_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileSystemOn_E`, 'utf8');

const X_EXAMPLE_TEMPLATE_FILE = `${envsubDir}/templateFileXExample`;
const X_EXAMPLE_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileXExample_E`, 'utf8');
const X_EXAMPLE_ENV_TEMPLATE_FILE = `${envsubDir}/templateFileXExampleEnv`;
const X_EXAMPLE_ENV_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileXExampleEnv_E`, 'utf8');
const X_EXAMPLE_ENV_FILE_TEMPLATE_FILE = `${envsubDir}/templateFileXExampleEnvFile`;
const X_EXAMPLE_ENV_FILE_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileXExampleEnvFile_E`, 'utf8');
const X_EXAMPLE_PROTECT_TEMPLATE_FILE = `${envsubDir}/templateFileXExampleProtect`;
const X_EXAMPLE_PROTECT_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileXExampleProtect_E`, 'utf8');
const X_EXAMPLE_SYNTAX_TEMPLATE_FILE = `${envsubDir}/templateFileXExampleSyntax`;
const X_EXAMPLE_SYNTAX_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileXExampleSyntax_E`, 'utf8');
const X_EXAMPLE_SYSTEM_TEMPLATE_FILE = `${envsubDir}/templateFileXExampleSystem`;
const X_EXAMPLE_SYSTEM_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileXExampleSystem_E`, 'utf8');

const Y_EXAMPLE_TEMPLATE_FILE = `${envsubhDir}/templateFileYExample`;
const Y_EXAMPLE_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubhDir}/templateFileYExample_E`, 'utf8');

const templateFiles = {
  envsub: {
    OUTPUT_FILE: `${envsubDir}/outputFile`,
    MY_TEMPLATE_FILE: `${envsubDir}/templateFile`,
    MY_TEMPLATE_FILE_EXPECTED: readFileSync(`${envsubDir}/templateFile_E`, 'utf8'),
    NO_TEMPLATE_FILE: `${envsubDir}/noTemplateFile`,
    TEMP_TEMPLATE_FILE: `${envsubDir}/tempTemplateFile`,
    DIFF_TEMPLATE_FILE: `${envsubDir}/templateFileDiff`,
    ENVFILE1,
    ENVFILE2,
    ENVFILE3,
    ENVFILE4,
    ENVFILE5,
    ENVFILE6,
    ENVFILE7,
    COMBINED_TEMPLATE_FILE,
    COMBINED_TEMPLATE_FILE_EXPECTED,
    ENV_TEMPLATE_FILE,
    ENV_TEMPLATE_FILE_EXPECTED,
    ENV_FILE_TEMPLATE_FILE,
    ENV_FILE_TEMPLATE_FILE_EXPECTED,
    ENV_INVALID_TEMPLATE_FILE,
    ENV_INVALID_TEMPLATE_FILE_EXPECTED,
    ENV_PROTECT_TEMPLATE_FILE,
    ENV_PROTECT_TEMPLATE_FILE_EXPECTED,
    PROTECT_TEMPLATE_FILE,
    PROTECT_OFF_TEMPLATE_FILE_EXPECTED,
    PROTECT_ON_TEMPLATE_FILE_EXPECTED,
    SYNTAX_TEMPLATE_FILE,
    SYNTAX_DEFAULT_TEMPLATE_FILE_EXPECTED,
    SYNTAX_DOLLAR_BASIC_TEMPLATE_FILE_EXPECTED,
    SYNTAX_DOLLAR_BOTH_TEMPLATE_FILE_EXPECTED,
    SYNTAX_DOLLAR_CURLY_TEMPLATE_FILE_EXPECTED,
    SYNTAX_HANDLEBARS_TEMPLATE_FILE_EXPECTED,
    SYSTEM_TEMPLATE_FILE,
    SYSTEM_OFF_TEMPLATE_FILE_EXPECTED,
    SYSTEM_ON_TEMPLATE_FILE_EXPECTED,
    X_EXAMPLE_TEMPLATE_FILE,
    X_EXAMPLE_TEMPLATE_FILE_EXPECTED,
    X_EXAMPLE_ENV_TEMPLATE_FILE,
    X_EXAMPLE_ENV_TEMPLATE_FILE_EXPECTED,
    X_EXAMPLE_ENV_FILE_TEMPLATE_FILE,
    X_EXAMPLE_ENV_FILE_TEMPLATE_FILE_EXPECTED,
    X_EXAMPLE_PROTECT_TEMPLATE_FILE,
    X_EXAMPLE_PROTECT_TEMPLATE_FILE_EXPECTED,
    X_EXAMPLE_SYNTAX_TEMPLATE_FILE,
    X_EXAMPLE_SYNTAX_TEMPLATE_FILE_EXPECTED,
    X_EXAMPLE_SYSTEM_TEMPLATE_FILE,
    X_EXAMPLE_SYSTEM_TEMPLATE_FILE_EXPECTED
  },
  envsubh: {
    OUTPUT_FILE: `${envsubhDir}/outputFile`,
    MY_TEMPLATE_FILE: `${envsubhDir}/templateFile`,
    MY_TEMPLATE_FILE_EXPECTED: readFileSync(`${envsubhDir}/templateFile_E`, 'utf8'),
    NO_TEMPLATE_FILE: `${envsubhDir}/noTemplateFile`,
    TEMP_TEMPLATE_FILE: `${envsubhDir}/tempTemplateFile`,
    DIFF_TEMPLATE_FILE: `${envsubhDir}/templateFileDiff`,
    Y_EXAMPLE_TEMPLATE_FILE,
    Y_EXAMPLE_TEMPLATE_FILE_EXPECTED
  }
};

module.exports = templateFiles;
