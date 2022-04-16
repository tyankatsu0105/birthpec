import { prompt } from 'enquirer';
import type { FrontMatterResult } from 'front-matter';
import fs from 'fs-extra';

import { logBox } from '../../shared';
import type { FrontMatterAttributes } from '../../types';

const parseFrontMatter = (
  rendered: FrontMatterResult<FrontMatterAttributes>
) => {
  const content = rendered.body;
  const { to } = rendered.attributes;

  return {
    content,
    to,
  };
};

type Prompt = { enableOverride: boolean };

export const handlingRendered = (
  rendered: FrontMatterResult<FrontMatterAttributes>
) => {
  (async () => {
    const { content, to } = parseFrontMatter(rendered);

    const isExistFile = fs.pathExistsSync(to);
    let enableGenerateFile = true;
    let enableOverride = false;

    if (isExistFile) {
      const response = await prompt<Prompt>({
        initial: false,
        message: `${to}\nis already exist. Do you override?`,
        name: 'enableOverride',
        type: 'confirm',
      });

      enableGenerateFile = response.enableOverride;
      enableOverride = response.enableOverride;

      if (!enableOverride) {
        logBox().logExit((projectName) => `${projectName} is exited.`);
      }
    }

    if (enableGenerateFile) {
      fs.outputFileSync(to, content);

      const info = enableOverride ? 'Update' : 'Create';

      logBox().logInfo(`✨ ${info}: ${to}`);
    }
  })();
};
