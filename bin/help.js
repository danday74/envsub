let verses = [
  'For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life. John 3:16',
  'Behold, I stand at the door and knock. If anyone hears my voice and opens the door, then I will come in to him, and will dine with him, and he with me. Revelation 3:20',
  'I can do all things through Christ, who strengthens me. Philippians 4:13',
  'You will know the truth, and the truth will make you free. John 8:32',
  'The Lord makes firm the steps of the one who delights in him; though he may stumble, he will not fall, for the Lord upholds him with his hand. Psalm 37:23-24',
  'If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness. 1 John 1:9',
  'But seek first God’s Kingdom, and his righteousness; and all these things will be given to you as well. Matthew 6:33',
  'Come to me, all you who labor and are heavily burdened, and I will give you rest. Matthew 11:28',
  'Jesus said to her, “I am the resurrection and the life. He who believes in me will still live, even if he dies. Whoever lives and believes in me will never die. Do you believe this?” John 11:25-26',
  'And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him. Hebrews 11:6'
];

let help = (program, examples) => {

  let verse = verses[Math.floor(Math.random() * verses.length)];

  /* istanbul ignore next */
  program.on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    Typical usage');
    console.log('    -------------');
    console.log(`    $ ${examples[0]}`);
    console.log(`    $ ${examples[1]}`);
    console.log('');
    console.log('    Overwrite your template file');
    console.log('    ----------------------------');
    console.log('    After copying a template file into a docker image, it is useful to overwrite the copied file with its substituted equivalent.');
    console.log(`    $ ${examples[2]}`);
    console.log(`    $ ${examples[3]}`);
    console.log('');
    console.log('  Author says:');
    console.log('');
    console.log('    This is a well tested module. Issues (bugs) raised on github will be fixed!');
    console.log('    A lot of loving effort has gone into making this module the best that it could be.');
    console.log(`    ${verse}`);
  });
};

module.exports = help;
