import * as changeCase from 'change-case';
import ejs from 'ejs';
import fm from 'front-matter';

import { loadConfig, parseFile } from '../../shared';
import type { FrontMatterAttributes, Generate } from '../../types';
import { handlingRendered } from './handling-rendered';

const getOptions = (targetFilePath: Generate['targetFilePath']) => {
  const { config } = loadConfig();
  const { helper: customHelper } = config;

  const helper = {
    ...customHelper,
    changeCase,
  };

  const { dirName, extensionName, fileName } = parseFile(targetFilePath);

  return {
    dirName,
    extensionName,
    fileName,
    helper,
  };
};

export const generateSpec = (
  targetFilePath: Generate['targetFilePath'],
  template: string,
  exportItems: string[] | null
) => {
  const { dirName, extensionName, fileName, helper } =
    getOptions(targetFilePath);
  const rendered = fm<FrontMatterAttributes>(
    ejs.render(template, {
      dirName,
      exportItems,
      extensionName,
      fileName,
      helper,
    })
  );

  handlingRendered(rendered);
};
