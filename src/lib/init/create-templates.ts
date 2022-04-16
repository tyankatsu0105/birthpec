import fs from 'fs-extra';
import path from 'path';

import { CONFIG_NAME, logBox } from '../../shared';

const templateName = '__birthpec';

const templatePath = path.join(__dirname, 'templates', templateName);
const templateDistPath = path.join(process.cwd(), templateName);

const configPath = path.join(__dirname, 'templates', CONFIG_NAME);
const configDistPath = path.join(process.cwd(), CONFIG_NAME);

const { logInfo } = logBox();
export const createTemplates = () => {
  fs.copySync(templatePath, templateDistPath);
  fs.copySync(configPath, configDistPath);
  logInfo(
    `${templateName} and ${CONFIG_NAME} \nare created on your project's root.`
  );
};
