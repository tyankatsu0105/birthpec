import { program } from 'commander';

import { generate, init } from '../lib';
import { PROJECT_NAME, VERSION } from '../shared';

program.helpOption('-h, --help', 'Show help');

program
  .version(VERSION, '-v, --version', `Print version of ${PROJECT_NAME}`)
  .name(PROJECT_NAME)
  .usage('<template-name> <target-file-path>')
  .description('Run config initialization wizard')
  .arguments('<template-name> <target-file-path>')
  .action((templateName, targetFilePath) => {
    generate({ targetFilePath, templateName });
  });

program.command('init').usage('init').action(init);

program.on('--help', () => {
  console.log('');
  console.log('Example:');
  console.log(`  $ ${PROJECT_NAME} basic src/shared/helpers/sum.ts`);
  console.log(`  $ ${PROJECT_NAME} init`);
});
program.parse(process.argv);
