import { parseTypescript } from '../../shared';
import type { Generate } from '../../types';
import { generateSpec } from './generate-spec';
import { getTemplate } from './get-template';

export const generate = (arg: Generate) => {
  const { template } = getTemplate(arg.templateName);

  const { exportItems } = parseTypescript(arg.targetFilePath);

  generateSpec(arg.targetFilePath, template, exportItems);
};
