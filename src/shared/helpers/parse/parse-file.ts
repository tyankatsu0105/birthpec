import path from 'path';
import { Generate } from '../../../types';

export const parseFile = (targetFilePath: Generate['targetFilePath']) => {
  const fileName = path.basename(targetFilePath, path.extname(targetFilePath));
  const dirName = path.dirname(targetFilePath);

  /**
   * Note: Comma is removed
   */
  const extensionName = path.extname(targetFilePath).substring(1);

  return {
    fileName,
    dirName,
    extensionName,
  };
};
