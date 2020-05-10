type PackageJson = {
  version: string;
};
/**
 * Note: package.json is not in src directory.
 * So we can't use import syntax.
 */
/* eslint-disable-next-line */
const pkg: PackageJson = require('../../../package.json');

export const VERSION = pkg.version;
export const PROJECT_NAME = 'birthpec';
