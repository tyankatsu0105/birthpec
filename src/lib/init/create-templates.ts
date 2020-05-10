import path from 'path';
import fs from 'fs-extra';
import { logBox } from '../../shared';

const templateName = '__birthpec';

const templatePath = path.join(__dirname, templateName);
const distPath = path.join(process.cwd(), templateName);

const { logInfo } = logBox();
export const createTemplates = () => {
  fs.copySync(templatePath, distPath);
  logInfo(`${templateName} is created on your project's root.`);
};
