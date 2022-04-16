import { parse } from '@typescript-eslint/parser';
import fs from 'fs';
import path from 'path';

import { getExportItems } from '../parse-typescript';

const getAST = (fixtureFileName: string) => {
  const template = fs.readFileSync(
    path.join(__dirname, 'fixtures', fixtureFileName),
    { encoding: 'utf8' }
  );

  const ast = parse(template, {
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  });
  return { ast };
};

describe('parse-typescrript', () => {
  describe('getExportItems', () => {
    it('not exists export item', () => {
      const { ast } = getAST('no-export.ts');

      const { exportItems } = getExportItems(ast);
      expect(exportItems).toEqual([]);
    });

    it('Variable', () => {
      const { ast } = getAST('variable.ts');

      const { exportItems } = getExportItems(ast);
      expect(exportItems).toEqual(['var1', 'var2', 'var3']);
    });

    it('Function', () => {
      const { ast } = getAST('function.ts');

      const { exportItems } = getExportItems(ast);
      expect(exportItems).toEqual([
        'fn',
        'fn2',
        'fn3',
        'fn4',
        'fn6',
        'fn7',
        'insideFn',
      ]);
    });

    it('Class', () => {
      const { ast } = getAST('class.ts');

      const { exportItems } = getExportItems(ast);
      expect(exportItems).toEqual(['Class']);
    });

    it('ExportsList', () => {
      const { ast } = getAST('exports-list.ts');

      const { exportItems } = getExportItems(ast);
      expect(exportItems).toEqual(['var1', 'var2']);
    });

    it('ExportsFromClause', () => {
      const { ast } = getAST('export-from-clause.ts');

      const { exportItems } = getExportItems(ast);
      expect(exportItems).toEqual(['AAA', 'var2']);
    });

    it('ExportDefault', () => {
      const { ast } = getAST('export-default.ts');

      const { exportItems } = getExportItems(ast);
      expect(exportItems).toEqual(['var1', 'var2', 'var3']);
    });
  });
});
