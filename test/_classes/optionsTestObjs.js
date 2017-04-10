const Imp = require('./TestImports');
const Tmp = require('./templateFiles').envsub;
const TmpH = require('./templateFiles').envsubh;

let diffTests = (diffTemplateFile) => {
  return [
    {
      testName: '--diff should not log diff between template file and output file by default',
      templateFile: diffTemplateFile,
      outputContents: null,
      options: {},
      postFunc: () => {
        // noinspection BadExpressionStatementJS
        Imp.expect(Imp.LogDiff.logDiff).not.to.have.been.called;
      },
      cli: {
        flags: []
      }
    },
    {
      testName: '--diff should log diff between template file and output file when flag set',
      templateFile: diffTemplateFile,
      outputContents: null,
      options: {diff: true},
      postFunc: () => {
        // noinspection BadExpressionStatementJS
        Imp.expect(Imp.LogDiff.logDiff).to.have.been.called;
      },
      cli: {
        flags: ['--diff']
      }
    }
  ];
};

let envsub = [
  ...diffTests(Tmp.DIFF_TEMPLATE_FILE),
  {
    testName: '--env should only substitute given environment variables',
    preFunc: () => {
      process.env.EXISTA = 'AAAENV';
      process.env.EXISTB = 'BBBENV';
      process.env.EXISTC = 'CCCENV';
    },
    templateFile: Tmp.ENV_TEMPLATE_FILE,
    outputContents: Tmp.ENV_TEMPLATE_FILE_EXPECTED,
    options: {
      envs: [
        {name: 'EXISTB'},
        {name: 'EXISTC', value: 'CCCEQL'},
        {name: 'NOEXISTY'},
        {name: 'NOEXISTZ', value: 'ZZZEQL'},
        {}
      ]
    },
    cli: {
      flags: '--env EXISTB --env EXISTC=CCCEQL --env NOEXISTY --env NOEXISTZ=ZZZEQL'.split(' '),
    }
  },
  {
    testName: '--env should not substitute environment variables with invalid names',
    templateFile: Tmp.ENV_INVALID_TEMPLATE_FILE,
    outputContents: Tmp.ENV_INVALID_TEMPLATE_FILE_EXPECTED,
    options: {
      envs: [
        {name: 'VALID', value: 'SUB'},
        {name: '9INVALID', value: 'NOSUB'},
      ]
    },
    postFunc: () => {
      Imp.expect(console.warn).to.have.been.calledWithMatch(/Skipping environment variable '9INVALID'/);
    },
    cli: {
      flags: '--env VALID=SUB --env 9INVALID=NOSUB'.split(' ')
    }
  },
  {
    testName: '--protect should substitute non-existent environment variables by default',
    templateFile: Tmp.PROTECT_TEMPLATE_FILE,
    outputContents: Tmp.PROTECT_TEMPLATE_FILE_OFF_EXPECTED,
    options: {},
    cli: {
      flags: []
    }
  },
  {
    testName: '--protect should not substitute non-existent environment variables when flag set',
    templateFile: Tmp.PROTECT_TEMPLATE_FILE,
    outputContents: Tmp.PROTECT_TEMPLATE_FILE_ON_EXPECTED,
    options: {protect: true},
    cli: {
      flags: ['--protect']
    }
  },
  {
    testName: '--syntax should support default syntax',
    templateFile: Tmp.SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.SYNTAX_TEMPLATE_FILE_DEFAULT_EXPECTED,
    options: {syntax: 'default'},
    cli: {
      flags: '--syntax default'.split(' ')
    }
  },
  {
    testName: '--syntax should support dollar basic syntax',
    templateFile: Tmp.SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.SYNTAX_TEMPLATE_FILE_DOLLAR_BASIC_EXPECTED,
    options: {syntax: 'dollar-basic'},
    cli: {
      flags: '--syntax dollar-basic'.split(' ')
    }
  },
  {
    testName: '--syntax should support dollar both syntax',
    templateFile: Tmp.SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.SYNTAX_TEMPLATE_FILE_DOLLAR_BOTH_EXPECTED,
    options: {syntax: 'dollar-both'},
    cli: {
      flags: '--syntax dollar-both'.split(' ')
    }
  },
  {
    testName: '--syntax should support dollar curly syntax',
    templateFile: Tmp.SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.SYNTAX_TEMPLATE_FILE_DOLLAR_CURLY_EXPECTED,
    options: {syntax: 'dollar-curly'},
    cli: {
      flags: '--syntax dollar-curly'.split(' ')
    }
  },
  {
    testName: '--syntax should support handlebars syntax',
    templateFile: Tmp.SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.SYNTAX_TEMPLATE_FILE_HANDLEBARS_EXPECTED,
    options: {syntax: 'handlebars'},
    cli: {
      flags: '--syntax handlebars'.split(' ')
    }
  },
  {
    testName: '--env with --protect should ensure non-existent environment variables are not substituted',
    templateFile: Tmp.ENV_PROTECT_TEMPLATE_FILE,
    outputContents: Tmp.ENV_PROTECT_TEMPLATE_FILE_EXPECTED,
    options: {
      envs: [
        {name: 'ENV_SELECTED_BUT_PROTECTED'},
        {name: 'ENV_SELECTED_BUT_PROTECTED_WITH_DEFAULT', value: 'SUB'}
      ],
      protect: true
    },
    cli: {
      flags: '--env ENV_SELECTED_BUT_PROTECTED --env ENV_SELECTED_BUT_PROTECTED_WITH_DEFAULT=SUB --protect'.split(' ')
    }
  },
  {
    testName: 'should support a combination of options',
    preFunc: () => {
      process.env.MYVAR1 = 'MYVAL1';
      process.env.EXIST_BUT_NO_SUB = 'WOW';
    },
    templateFile: Tmp.COMBINED_TEMPLATE_FILE,
    outputContents: Tmp.COMBINED_TEMPLATE_FILE_EXPECTED,
    options: {
      diff: true,
      envs: [
        {name: 'MYVAR1'},
        {name: 'MYVAR2', value: 'MYVAL2'},
        {name: 'SUB_BUT_NO_EXIST'},
      ],
      protect: true,
      syntax: 'dollar-both'
    },
    postFunc: () => {
      // noinspection BadExpressionStatementJS
      Imp.expect(Imp.LogDiff.logDiff).to.have.been.called;
    },
    cli: {
      flags: '-d -e MYVAR1 -e MYVAR2=MYVAL2 -e SUB_BUT_NO_EXIST -p -s dollar-both'.split(' ')
    }
  },
  {
    testName: 'example: envsub basic usage',
    preFunc: () => {
      process.env.MYVAR1 = 'foo';
      process.env.MYVAR2 = 'bar';
      process.env.MYVAR3 = '';
    },
    templateFile: Tmp.X_EXAMPLE_TEMPLATE_FILE,
    outputContents: Tmp.X_EXAMPLE_TEMPLATE_FILE_EXPECTED,
    options: {},
    cli: {
      flags: []
    }
  },
  {
    testName: 'example: envsub --env flag',
    preFunc: () => {
      process.env.MYVAR1 = 'foo';
      process.env.MYVAR2 = 'bar';
      process.env.MYVAR3 = 'bob';
    },
    templateFile: Tmp.X_EXAMPLE_ENV_TEMPLATE_FILE,
    outputContents: Tmp.X_EXAMPLE_ENV_TEMPLATE_FILE_EXPECTED,
    options: {
      envs: [
        {name: 'MYVAR1'},
        {name: 'MYVAR2', value: 'station'}
      ]
    },
    cli: {
      flags: '--env MYVAR1 --env MYVAR2=station'.split(' ')
    }
  },
  {
    testName: 'example: envsub --protect flag',
    preFunc: () => {
      process.env.MYVAR1 = 'foo';
      process.env.MYVAR2 = 'bar';
      process.env.MYVAR3 = '';
    },
    templateFile: Tmp.X_EXAMPLE_PROTECT_TEMPLATE_FILE,
    outputContents: Tmp.X_EXAMPLE_PROTECT_TEMPLATE_FILE_EXPECTED,
    options: {protect: true},
    cli: {
      flags: ['--protect']
    }
  },
  {
    testName: 'example: envsub --syntax flag',
    preFunc: () => {
      process.env.MYVAR1 = 'foo';
      process.env.MYVAR2 = 'bar';
      process.env.MYVAR3 = '';
    },
    templateFile: Tmp.X_EXAMPLE_SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.X_EXAMPLE_SYNTAX_TEMPLATE_FILE_EXPECTED,
    options: {syntax: 'handlebars'},
    cli: {
      flags: '--syntax handlebars'.split(' ')
    }
  }
];

let envsubh = [
  ...diffTests(TmpH.DIFF_TEMPLATE_FILE),
  {
    testName: 'example: envsubh basic usage',
    preFunc: () => {
      process.env.MYVAR1 = 'foo';
      process.env.MYVAR2 = 'bar';
      process.env.MYVAR3 = '';
    },
    templateFile: TmpH.Y_EXAMPLE_TEMPLATE_FILE,
    outputContents: TmpH.Y_EXAMPLE_TEMPLATE_FILE_EXPECTED,
    options: {},
    cli: {
      flags: []
    }
  }
];

module.exports = {
  envsub,
  envsubh
};
