import boxen, { BorderStyle, Options } from 'boxen';

import { PROJECT_NAME } from '../../const';

type Text = Parameters<typeof boxen>[0];

const commonOption: Options = {
  borderStyle: BorderStyle.Round,
  margin: 1,
  padding: 1,
};

export const logBox = () => {
  return {
    logExit(callback: (projectName: string) => string) {
      const text = callback(PROJECT_NAME);
      console.log(
        boxen(`${text}\nSee you👋`, {
          ...commonOption,
          borderColor: 'cyan',
        })
      );
    },
    logInfo(text: Text) {
      console.log(boxen(text, { ...commonOption, borderColor: 'green' }));
    },
  };
};
