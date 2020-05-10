import type { Generate } from '../../types';
import { getTemplate } from './get-template.ts';

export const generate = (arg: Generate) => {
  const { template } = getTemplate(arg.templateName);
};
