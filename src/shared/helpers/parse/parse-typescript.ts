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
 */
const getExportItems = (ast: TSESTree.Program) => {
  const exportItems: string[] = [];

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
      if (node.type === AST_NODE_TYPES['Identifier']) {
        exportItems.push(node.name);
      }
    },
  });

  /**
   * NOTE: Consider duplicate value
   */
  return { exportItems: [...new Set(exportItems)] };
};

export const parseTypescript = (targetFilePath: Generate['targetFilePath']) => {
  /* eslint-disable-next-line */
  try {
    const template = fs.readFileSync(targetFilePath, { encoding: 'utf-8' });
    const ast = parse(template, { sourceType: 'module' });

    const { exportItems } = getExportItems(ast);
    return {
      exportItems,
    };
  } catch (error) {
    throw error;
  }
};
