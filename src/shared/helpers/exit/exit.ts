import { logBox } from '../log';

export const exit = () => {
  process.on('unhandledRejection', () => {
    logBox().logExit((projectName) => `${projectName} is canceled.`);

    process.exitCode = 1;
  });
};
