import boxen, { Options, BorderStyle } from 'boxen';

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
      console.log(boxen(`${text}`, { ...commonOption, borderColor: 'green' }));
    },
    logError(text: Text) {
      console.log(boxen(text, { ...commonOption, borderColor: 'red' }));
    },
  };
};
