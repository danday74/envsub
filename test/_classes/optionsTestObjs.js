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
    testName: '--env-file should only substitute given environment variables',
    preFunc: () => {
      process.env.FILEVAR1 = 'SUB';
      process.env.FILEVAR2 = 'SUB';
      process.env.FILEVAR3 = 'SUB';
      process.env.FILEVAR4 = 'SUB';
      process.env.FILEVAR5 = 'SUB';
      process.env.FILEVAR6 = 'SUB';
      process.env.FILEVAR7 = 'SUB';
    },
    templateFile: Tmp.ENV_FILE_TEMPLATE_FILE,
    outputContents: Tmp.ENV_FILE_TEMPLATE_FILE_EXPECTED,
    options: {
      envFiles: [
        Tmp.ENVFILE1,
        Tmp.ENVFILE2,
      ]
    },
    cli: {
      flags: `--env-file ${Tmp.ENVFILE1} --env-file ${Tmp.ENVFILE2}`.split(' ')
    }
  },
  {
    testName: '--env-file should not substitute environment variables with invalid names',
    templateFile: Tmp.ENV_INVALID_TEMPLATE_FILE,
    outputContents: Tmp.ENV_INVALID_TEMPLATE_FILE_EXPECTED,
    options: {
      envFiles: [
        Tmp.ENVFILE3
      ]
    },
    postFunc: () => {
      Imp.expect(console.warn).to.have.been.calledWithMatch(/Skipping environment variable '9INVALID'/);
    },
    cli: {
      flags: `--env-file ${Tmp.ENVFILE3}`.split(' ')
    }
  },
  {
    testName: '--env-file should skip non-existent environment variable files',
    templateFile: Tmp.MY_TEMPLATE_FILE,
    outputContents: Tmp.MY_TEMPLATE_FILE_EXPECTED,
    options: {
      envFiles: [
        Tmp.NO_TEMPLATE_FILE
      ]
    },
    postFunc: () => {
      Imp.expect(console.warn).to.have.been.calledWithMatch(/Skipping environment variable file '.*' due to ENOENT/);
    },
    cli: {
      flags: `--env-file ${Tmp.NO_TEMPLATE_FILE}`.split(' ')
    }
  },
  {
    testName: '--protect should substitute non-existent environment variables by default',
    templateFile: Tmp.PROTECT_TEMPLATE_FILE,
    outputContents: Tmp.PROTECT_OFF_TEMPLATE_FILE_EXPECTED,
    options: {},
    cli: {
      flags: []
    }
  },
  {
    testName: '--protect should not substitute non-existent environment variables when flag set',
    templateFile: Tmp.PROTECT_TEMPLATE_FILE,
    outputContents: Tmp.PROTECT_ON_TEMPLATE_FILE_EXPECTED,
    options: {protect: true},
    cli: {
      flags: ['--protect']
    }
  },
  {
    testName: '--syntax should support default syntax',
    templateFile: Tmp.SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.SYNTAX_DEFAULT_TEMPLATE_FILE_EXPECTED,
    options: {syntax: 'default'},
    cli: {
      flags: '--syntax default'.split(' ')
    }
  },
  {
    testName: '--syntax should support dollar basic syntax',
    templateFile: Tmp.SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.SYNTAX_DOLLAR_BASIC_TEMPLATE_FILE_EXPECTED,
    options: {syntax: 'dollar-basic'},
    cli: {
      flags: '--syntax dollar-basic'.split(' ')
    }
  },
  {
    testName: '--syntax should support dollar both syntax',
    templateFile: Tmp.SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.SYNTAX_DOLLAR_BOTH_TEMPLATE_FILE_EXPECTED,
    options: {syntax: 'dollar-both'},
    cli: {
      flags: '--syntax dollar-both'.split(' ')
    }
  },
  {
    testName: '--syntax should support dollar curly syntax',
    templateFile: Tmp.SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.SYNTAX_DOLLAR_CURLY_TEMPLATE_FILE_EXPECTED,
    options: {syntax: 'dollar-curly'},
    cli: {
      flags: '--syntax dollar-curly'.split(' ')
    }
  },
  {
    testName: '--syntax should support handlebars syntax',
    templateFile: Tmp.SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.SYNTAX_HANDLEBARS_TEMPLATE_FILE_EXPECTED,
    options: {syntax: 'handlebars'},
    cli: {
      flags: '--syntax handlebars'.split(' ')
    }
  },
  {
    testName: '--system should prefer --env and --env-file environment variables by default',
    preFunc: () => {
      process.env.ENVVAR = 'SYSTEMENV';
      process.env.ENVFILEVAR = 'SYSTEMENVFILE';
    },
    templateFile: Tmp.SYSTEM_TEMPLATE_FILE,
    outputContents: Tmp.SYSTEM_OFF_TEMPLATE_FILE_EXPECTED,
    options: {
      envs: [
        {name: 'ENVVAR', value: 'ENV'},
        {name: 'ENVONLYVAR', value: 'ENVONLY'}
      ],
      envFiles: [
        Tmp.ENVFILE7
      ],
      system: false
    },
    cli: {
      flags: `--env ENVVAR=ENV --env ENVONLYVAR=ENVONLY --env-file ${Tmp.ENVFILE7}`.split(' ')
    }
  },
  {
    testName: '--system should prefer system environment variables when flag set',
    preFunc: () => {
      process.env.ENVVAR = 'SYSTEMENV';
      process.env.ENVFILEVAR = 'SYSTEMENVFILE';
    },
    templateFile: Tmp.SYSTEM_TEMPLATE_FILE,
    outputContents: Tmp.SYSTEM_ON_TEMPLATE_FILE_EXPECTED,
    options: {
      envs: [
        {name: 'ENVVAR', value: 'ENV'},
        {name: 'ENVONLYVAR', value: 'ENVONLY'}
      ],
      envFiles: [
        Tmp.ENVFILE7
      ],
      system: true
    },
    cli: {
      flags: `--env ENVVAR=ENV --env ENVONLYVAR=ENVONLY --env-file ${Tmp.ENVFILE7} --system`.split(' ')
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
    testName: '--env should override --env-file',
    templateFile: Tmp.MY_TEMPLATE_FILE,
    outputContents: Tmp.MY_TEMPLATE_FILE_EXPECTED,
    options: {
      envs: [
        {name: 'MY_NAME', value: 'Daniel'}
      ],
      envFiles: [
        Tmp.ENVFILE4
      ]
    },
    cli: {
      flags: `--env MY_NAME=Daniel --env-file ${Tmp.ENVFILE4}`.split(' ')
    }
  },
  {
    testName: 'should support a combination of options',
    preFunc: () => {
      process.env.MYVAR1 = 'MYVAL1';
      delete process.env.MYVAR2;
      delete process.env.MYVAR3;
      process.env.MYVAR5 = 'Win';
      process.env.EXIST_BUT_NO_SUB = 'WOW';
    },
    templateFile: Tmp.COMBINED_TEMPLATE_FILE,
    outputContents: Tmp.COMBINED_TEMPLATE_FILE_EXPECTED,
    options: {
      diff: true,
      envs: [
        {name: 'MYVAR1'},
        {name: 'MYVAR2', value: 'MYVAL2'},
        {name: 'MYVAR5', value: 'Lose'},
        {name: 'SUB_BUT_NO_EXIST'},
      ],
      envFiles: [
        Tmp.ENVFILE5
      ],
      protect: true,
      syntax: 'dollar-both',
      system: true
    },
    postFunc: () => {
      // noinspection BadExpressionStatementJS
      Imp.expect(Imp.LogDiff.logDiff).to.have.been.called;
    },
    cli: {
      flags: `-d -e MYVAR1 -e MYVAR2=MYVAL2 -e MYVAR5=Lose -e SUB_BUT_NO_EXIST -f ${Tmp.ENVFILE5} -p -s dollar-both -S`.split(' ')
    }
  },
  {
    testName: 'example: envsub basic usage',
    preFunc: () => {
      process.env.MYVAR1 = 'foo';
      process.env.MYVAR2 = 'bar';
      delete process.env.MYVAR3;
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
    testName: 'example: envsub --env-file flag',
    preFunc: () => {
      process.env.MYVAR1 = 'foo';
      process.env.MYVAR2 = 'bar';
      process.env.MYVAR3 = 'bob';
    },
    templateFile: Tmp.X_EXAMPLE_ENV_FILE_TEMPLATE_FILE,
    outputContents: Tmp.X_EXAMPLE_ENV_FILE_TEMPLATE_FILE_EXPECTED,
    options: {
      envFiles: [
        Tmp.ENVFILE6
      ]
    },
    cli: {
      flags: `--env-file ${Tmp.ENVFILE6}`.split(' ')
    }
  },
  {
    testName: 'example: envsub --protect flag',
    preFunc: () => {
      process.env.MYVAR1 = 'foo';
      process.env.MYVAR2 = 'bar';
      delete process.env.MYVAR3;
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
      delete process.env.MYVAR3;
    },
    templateFile: Tmp.X_EXAMPLE_SYNTAX_TEMPLATE_FILE,
    outputContents: Tmp.X_EXAMPLE_SYNTAX_TEMPLATE_FILE_EXPECTED,
    options: {syntax: 'handlebars'},
    cli: {
      flags: '--syntax handlebars'.split(' ')
    }
  },
  {
    testName: 'example: envsub --system flag',
    preFunc: () => {
      process.env.MYVAR1 = 'foo';
      process.env.MYVAR2 = 'bar';
      process.env.MYVAR3 = 'bob';
    },
    templateFile: Tmp.X_EXAMPLE_SYSTEM_TEMPLATE_FILE,
    outputContents: Tmp.X_EXAMPLE_SYSTEM_TEMPLATE_FILE_EXPECTED,
    options: {
      envs: [
        {name: 'MYVAR1'},
        {name: 'MYVAR2', value: 'station'}
      ],
      system: true
    },
    cli: {
      flags: '--env MYVAR1 --env MYVAR2=station --system'.split(' ')
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
      delete process.env.MYVAR3;
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
