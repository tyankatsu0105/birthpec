import { cosmiconfigSync } from 'cosmiconfig';

import type { Config } from '../../../types';
import { PROJECT_NAME } from '../../const';

const explorerSync = cosmiconfigSync(PROJECT_NAME);
const searchedFor = explorerSync.search();

export const loadConfig = () => {
  const config: Config = searchedFor?.config;

  return {
    config,
  };
};
