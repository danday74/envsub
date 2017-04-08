const readFileSync = require('fs').readFileSync;
const envsubDir = appRoot + '/test/envsub-global';
const envsubhDir = appRoot + '/test/envsubh-global';

const COMBINED_TEMPLATE_FILE = `${envsubDir}/templateFileCombined`;
const COMBINED_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileCombined_E`, 'utf8');

const ENV_TEMPLATE_FILE = `${envsubDir}/templateFileEnv`;
const ENV_TEMPLATE_FILE_EXPECTED = readFileSync(`${envsubDir}/templateFileEnv_E`, 'utf8');
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

const templateFiles = {
  envsub: {
    OUTPUT_FILE: `${envsubDir}/outputFile`,
    MY_TEMPLATE_FILE: `${envsubDir}/templateFile`,
    MY_TEMPLATE_FILE_EXPECTED: readFileSync(`${envsubDir}/templateFile_E`, 'utf8'),
    NO_TEMPLATE_FILE: `${envsubDir}/noTemplateFile`,
    TEMP_TEMPLATE_FILE: `${envsubDir}/tempTemplateFile`,
    DIFF_TEMPLATE_FILE: `${envsubDir}/templateFileDiff`,
    COMBINED_TEMPLATE_FILE,
    COMBINED_TEMPLATE_FILE_EXPECTED,
    ENV_TEMPLATE_FILE,
    ENV_TEMPLATE_FILE_EXPECTED,
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
    SYNTAX_HANDLEBARS_TEMPLATE_FILE_EXPECTED
  },
  envsubh: {
    OUTPUT_FILE: `${envsubhDir}/outputFile`,
    MY_TEMPLATE_FILE: `${envsubhDir}/templateFile`,
    MY_TEMPLATE_FILE_EXPECTED: readFileSync(`${envsubhDir}/templateFile_E`, 'utf8'),
    NO_TEMPLATE_FILE: `${envsubhDir}/noTemplateFile`,
    TEMP_TEMPLATE_FILE: `${envsubhDir}/tempTemplateFile`,
    DIFF_TEMPLATE_FILE: `${envsubhDir}/templateFileDiff`,
  }
};

module.exports = templateFiles;
