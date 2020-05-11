import { cosmiconfigSync } from 'cosmiconfig';
import { PROJECT_NAME } from '../../const';

import type { Config } from '../../../types';

const explorerSync = cosmiconfigSync(PROJECT_NAME);
const searchedFor = explorerSync.search();

export const loadConfig = () => {
  const config: Config = searchedFor?.config;

  return {
    config,
  };
};
