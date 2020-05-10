import type { Generate } from '../../types';
import { getTemplate } from './get-template.ts';
import { parseTypescript } from '../../shared';

export const generate = (arg: Generate) => {
  const { template } = getTemplate(arg.templateName);
  console.log(template);

  const { exportItems } = parseTypescript(arg.targetFilePath);
  console.log(exportItems);
};
