import { program } from 'commander';

import { VERSION, PROJECT_NAME } from '../shared';
import { init, generate } from '../lib';

program.helpOption('-h, --help', 'Show help');

program
  .version(VERSION, '-v, --version', `Print version of ${PROJECT_NAME}`)
  .name(PROJECT_NAME)
  .usage('<template-name> <target-file-path>')
  .description('Run config initialization wizard')
  .arguments('<template-name> <target-file-path>')
  .action((templateName, targetFilePath) => {
    generate({ templateName, targetFilePath });
  });

program.command('init').usage('init').action(init);

program.on('--help', () => {
  console.log('');
  console.log('Example:');
  console.log(`  $ ${PROJECT_NAME} basic src/shared/helpers/sum.ts`);
  console.log(`  $ ${PROJECT_NAME} init`);
});
program.parse(process.argv);

// import { program } from 'commander';

// import { VERSION, PROJECT_NAME } from '../shared';
// import { init, generate } from '../lib';

// program.arguments('<template-name> <path>').action(() => {
//   console.log('aa');
// });

// program.name(PROJECT_NAME).usage('<template-name> <target-file-path>');

// program.helpOption('-h, --help', 'Show help');

// program.option('-i, --init', 'Run config initialization wizard').action(init);

// program
//   .option('-t, --template <name>', 'Choose template')
//   .option('-c, --config <path>', 'Input config file path')
//   .version(VERSION, '-v, --version', `Print version of ${PROJECT_NAME}`);

// program.on('--help', () => {
//   console.log('');
//   console.log('Example:');
//   console.log(`  $ ${PROJECT_NAME} basic src/shared/helpers/sum.ts`);
// });
// program.parse(process.argv);
