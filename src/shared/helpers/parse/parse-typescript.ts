import { parse } from '@typescript-eslint/parser';
import {
  AST_NODE_TYPES,
  simpleTraverse,
  TSESTree,
} from '@typescript-eslint/typescript-estree';
import fs from 'fs';

import { Generate } from '../../../types';

const traverseObjectPattern = (
  properties: (
    | TSESTree.PropertyComputedName
    | TSESTree.PropertyNonComputedName
    | TSESTree.RestElement
  )[],
  callback: (
    property: TSESTree.PropertyComputedName | TSESTree.PropertyNonComputedName
  ) => void
) => {
  for (const property of properties) {
    if (property.type === AST_NODE_TYPES['Property']) {
      if (property.value.type === AST_NODE_TYPES['Identifier']) {
        callback(property);
      } else if (property.value.type === AST_NODE_TYPES['ObjectPattern']) {
        traverseObjectPattern(property.value.properties, callback);
      }
    }
  }
};

/**
 * Get names at "Identifier"
 * Only support ES modules
 * You can check ast at [astexplorer](https://astexplorer.net/#/VeRiaJxlcX)
 * @see https://tc39.es/ecma262/#sec-exports
 */
export const getExportItems = (ast: TSESTree.Program) => {
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
      if (node.type === AST_NODE_TYPES['VariableDeclarator']) {
        if (node.id.type === AST_NODE_TYPES['Identifier']) {
          exportItems.push(node.id.name);
        }

        if (node.id.type === AST_NODE_TYPES['ObjectPattern']) {
          traverseObjectPattern(node.id.properties, (property) => {
            property.value.type === AST_NODE_TYPES['Identifier'] &&
              exportItems.push(property.value.name);
          });
        }
      }

      if (node.type === AST_NODE_TYPES['FunctionDeclaration'] && node.id) {
        exportItems.push(node.id.name);
      }

      if (node.type === AST_NODE_TYPES['ExportSpecifier']) {
        /**
         * Note: consider export { myFunction as default };
         */
        if (node.exported.name === 'default') {
          exportItems.push(node.local.name);
        } else {
          exportItems.push(node.exported.name);
        }
      }

      if (
        node.type === AST_NODE_TYPES['ExportDefaultDeclaration'] &&
        node.declaration.type === AST_NODE_TYPES['Identifier']
      ) {
        exportItems.push(node.declaration.name);
      }

      if (node.type === AST_NODE_TYPES['ClassDeclaration'] && node.id) {
        exportItems.push(node.id.name);
      }

      if (
        node.type === AST_NODE_TYPES['AssignmentExpression'] &&
        node.left.type === AST_NODE_TYPES['Identifier']
      ) {
        exportItems.push(node.left.name);
      }
    },
  });

  return {
    exportItems,
  };
};

export const parseTypescript = (targetFilePath: Generate['targetFilePath']) => {
  /* eslint-disable-next-line */
  try {
    const template = fs.readFileSync(targetFilePath, { encoding: 'utf-8' });

    const ast = parse(template, {
      ecmaFeatures: { jsx: true },
      sourceType: 'module',
    });

    const { exportItems } = getExportItems(ast);
    return {
      exportItems,
    };
  } catch (error) {
    throw error;
  }
};
