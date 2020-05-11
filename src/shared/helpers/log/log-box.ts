import boxen, { Options, BorderStyle } from 'boxen';
import { PROJECT_NAME } from '../../const';

type Text = Parameters<typeof boxen>[0];

const commonOption: Options = {
  borderStyle: BorderStyle.Round,
  float: 'center',
  padding: 1,
  margin: 1,
};

export const logBox = () => {
  return {
    logInfo(text: Text) {
      console.log(boxen(text, { ...commonOption, borderColor: 'green' }));
    },
    logExit(callback: (projectName: string) => string) {
      const text = callback(PROJECT_NAME);
      console.log(
        boxen(`${text}\nSee you👋`, {
          ...commonOption,
          borderColor: 'cyan',
        })
      );
    },
  };
};
