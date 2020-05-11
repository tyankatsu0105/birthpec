import ejs from 'ejs';
import * as changeCase from 'change-case';
import fm from 'front-matter';

import type { Generate, FrontMatterAttributes } from '../../types';

import { parseFile, loadConfig } from '../../shared';

import { handlingRendered } from './handling-rendered';

const getOptions = (targetFilePath: Generate['targetFilePath']) => {
  const { config } = loadConfig();
  const { helper: customHelper } = config;

  const helper = {
    ...customHelper,
    changeCase,
  };

  const { fileName, dirName, extensionName } = parseFile(targetFilePath);

  return {
    helper,
    fileName,
    dirName,
    extensionName,
  };
};

export const generateSpec = (
  targetFilePath: Generate['targetFilePath'],
  template: string,
  exportItems: string[] | null
) => {
  const { helper, fileName, dirName, extensionName } = getOptions(
    targetFilePath
  );
  const rendered = fm<FrontMatterAttributes>(
    ejs.render(template, {
      fileName,
      dirName,
      extensionName,
      helper,
      exportItems,
    })
  );

  handlingRendered(rendered);
};
