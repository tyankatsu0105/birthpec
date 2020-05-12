import fs from 'fs';
import path from 'path';
import { parse } from '@typescript-eslint/parser';
import { getExportItems } from '../parse-typescript';

const getAST = (fixtureFileName: string) => {
  const template = fs.readFileSync(
    path.join(__dirname, 'fixtures', fixtureFileName),
    { encoding: 'utf8' }
  );

  const ast = parse(template, {
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  });
  return { ast };
};

describe('parse-typescrript', () => {
  describe('getExportItems', () => {
    it('function name', () => {
      const { ast } = getAST('variable-name.ts');

      const { exportItems } = getExportItems(ast);
      expect(exportItems).toEqual(['foo']);
    });
  });
});
