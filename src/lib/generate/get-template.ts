import fs from 'fs';

import { loadConfig } from '../../shared';
import type { Config, Generate } from '../../types';

/**
 * Read ejs template contents
 */
const readTemplate = (templates: Config['templates'], templateName: string) => {
  const templatePath = `${templates}/${templateName}/index.ejs`;

  /* eslint-disable-next-line */
  try {
    const template = fs.readFileSync(templatePath, { encoding: 'utf-8' });
    return { template };
  } catch (error) {
    throw error;
  }
};

/**
 * Get ejs contents as utf-8
 */
export const getTemplate = (templateName: Generate['templateName']) => {
  const { config } = loadConfig();
  const { template } = readTemplate(config.templates, templateName);
  return { template };
};
