import fs from 'fs';
import { parse } from '@typescript-eslint/parser';
import {
  AST_NODE_TYPES,
  TSESTree,
  simpleTraverse,
} from '@typescript-eslint/typescript-estree';

import { Generate } from '../../../types';

/**
 * Get names at "Identifier"
 * Only support ES modules
 * You can check ast at [astexplorer](https://astexplorer.net/#/VeRiaJxlcX)
 * @see https://tc39.es/ecma262/#sec-exports
 */
export const getExportItems = (ast: TSESTree.Program) => {
  let exportItems: string[] = [];
  let removableItems: string[] = [];

  const exportDeclarations: TSESTree.Statement[] = ast.body.filter(
    ({ type }: { type: unknown }) =>
      type === AST_NODE_TYPES['ExportNamedDeclaration'] ||
      type === AST_NODE_TYPES['ExportDefaultDeclaration'] ||
      type === AST_NODE_TYPES['TSExportAssignment']
  );

  const filterdAst = {
    ...ast,
    body: exportDeclarations,
  };

  simpleTraverse(filterdAst, {
    enter(node) {
      if (
        node.type === AST_NODE_TYPES['Identifier'] ||
        node.type === AST_NODE_TYPES['ExportSpecifier']
      ) {
        if (node.type === AST_NODE_TYPES['ExportSpecifier']) {
          if (node.local.name !== node.exported.name) {
            exportItems.push(node.exported.name);
            removableItems.push(node.local.name);
          }
        }

        if (node.type === AST_NODE_TYPES['Identifier']) {
          exportItems.push(node.name);
        }
      }
    },
  });

  exportItems = [...new Set(exportItems)];
  removableItems = [...new Set(removableItems)];

  const result = exportItems.filter(
    (exportItem) => !removableItems.includes(exportItem)
  );

  /**
   * NOTE: Consider duplicate value
   */
  return {
    exportItems: exportItems.length > 0 ? result : null,
  };
};

export const parseTypescript = (targetFilePath: Generate['targetFilePath']) => {
  /* eslint-disable-next-line */
  try {
    const template = fs.readFileSync(targetFilePath, { encoding: 'utf-8' });

    const ast = parse(template, {
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    });

    const { exportItems } = getExportItems(ast);
    return {
      exportItems,
    };
  } catch (error) {
    throw error;
  }
};
