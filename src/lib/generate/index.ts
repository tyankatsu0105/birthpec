import type { Generate } from '../../types';
import { getTemplate } from './get-template';
import { generateSpec } from './generate-spec';
import { parseTypescript } from '../../shared';

export const generate = (arg: Generate) => {
  const { template } = getTemplate(arg.templateName);

  const { exportItems } = parseTypescript(arg.targetFilePath);

  generateSpec(arg.targetFilePath, template, exportItems);
};
