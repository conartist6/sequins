const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');
const babel = require('@babel/core');
const prettier = require('prettier');

const prettierOptions = {
  ...prettier.resolveConfig.sync('../.prettierrc'),
  parser: 'babylon',
};

const { dirname, relative, join } = path;

const collectionTypes = {
  Concrete: {
    Duplicated: 'Set',
    Indexed: 'List',
    Keyed: 'Map',
  },
  Sequence: {
    Duplicated: 'SetSequence',
    Indexed: 'IndexedSequence',
    Keyed: 'KeyedSequence',
  },
};

function importPath(state, importNode) {
  return relative(state.cwd, join(dirname(state.filename), importNode.source.value));
}

/**
 * The goal here is to create type tests from normal tests by essentially
 * "inlining" the definition of the `makeTests` function and applying the call's
 * parameters.
 *
 * e.g.
 * ```js
 *   function makeTests(CollectionConstructor, collectionType, collectionSubtype) {
 *     expect(new CollectionConstructor().map(x=>x)).toEqual(new CollectionConstructor())
 *   }
 *
 *   makeTests(List, 'Concrete', 'Indexed');
 * ```
 *
 * will become
 *
 * ```js
 *   function typeTest__1() {
 *     expect(new List().map(x => x)).toEqual(new List())
 *   }
 * ```
 *
 * Normally something like this would be accomplished by making the `makeTests` function
 * generic, but this is a poor match for the goal of type testing. In particular a generic
 * function is still restricted to having only one type against which to check internally,
 * where we need to check that the types work appropriately for each of six different types.
 *
 * Another advantage to this strategy is that we can craft our type-test output such that it
 * largely avoids using any type syntax at all, which allows a single type test to be
 * interpreted by both the typescript and flow parsers, thus facilitating verification of
 * the correctness of the implementation, TS types, and flow types from a single BDD style
 * test.
 */
function makeTypeTests({ types: t }) {
  const visitor = {
    Program(path, state) {
      state.makeTestsCallCount = 0;
    },
    FunctionDeclaration(path, state) {
      if (path.node.id.name === 'makeTests') {
        state.makeTestsFunction = path.node;
        path.remove();
      }
    },
    ExpressionStatement(path, state) {
      if (
        path.node.expression.type === 'CallExpression' &&
        path.node.expression.callee.name === 'makeTests'
      ) {
        const newFunc = t.cloneNode(state.makeTestsFunction);
        newFunc.id.name = 'typeTest__' + ++state.makeTestsCallCount;

        const bakedArgs = new Map(
          path.node.expression.arguments.map((argument, i) => [newFunc.params[i].name, argument]),
        );

        path.replaceWith(newFunc);

        for (const [name, argument] of bakedArgs) {
          const binding = path.scope.getBinding(name);

          // Typescript can't treat a variable as a type, but it can treat a class as a type, so
          // we just replace the variable with its now static value.
          // I would have just done this as part of the previous transform, but I have to actually
          // do the replacement before the needed path (and scope) information is known
          for (const referencePath of binding.referencePaths) {
            referencePath.replaceWith(t.cloneWithoutLoc(argument));

            const node = referencePath.node;
            const parentNode = referencePath.parentPath.node;

            // replace code like Collection.Sequence["Set"] with Collection.Sequence.Set to normalize
            // as preparation for later transformations
            if (
              parentNode.type === 'MemberExpression' &&
              parentNode.computed &&
              t.isStringLiteral(argument)
            ) {
              parentNode.property = t.Identifier(argument.value);
              parentNode.computed = false;
            }

            // Turn code like SetSequence<string, number> into SetSequence<number>.
            if (
              parentNode.type === 'TSTypeReference' &&
              parentNode.typeParameters &&
              parentNode.typeParameters.params.length === 2 &&
              !['Map', 'KeyedSequence'].includes(node.name)
            ) {
              parentNode.typeParameters.params.shift();
            }
          }
        }

        path.node.params = [];
      }
    },
    ImportDeclaration(path, state) {
      if ('src/collection' === importPath(state, path.node)) {
        path.remove();
      } else if ('src' === importPath(state, path.node)) {
        path.node.source.value += '/..';
      }
    },
    MemberExpression(path, state) {
      let node = path.node;
      const memberSegments = [];
      while (node.type === 'MemberExpression') {
        memberSegments.unshift(node.property.name);
        node = node.object;
      }

      /**
       * Turns code like Collection.Sequence.Keyed into KeyedSequence
       */
      if (node.type === 'Identifier' && node.name === 'Collection' && memberSegments.length === 2) {
        const collectionName = collectionTypes[memberSegments[0]][memberSegments[1]];
        path.replaceWith(t.Identifier(collectionName));
      }
    },
  };

  return {
    name: 'make-type-tests',
    visitor,
  };
}

function processPath(basename) {
  const typeTest = babel.transformFileSync(basename + '.test.js', {
    babelrc: false,
    configFile: false,
    plugins: [
      '@babel/plugin-syntax-typescript',
      babel.createConfigItem(makeTypeTests),
      // Dead code elimination removes cases like `'Concrete' === 'Duplicated' ? ...` easing analysis
      // This also eliminates useless variables like `const ConcreteConstructor = Set` by distributing the value
      ['minify-dead-code-elimination', { keepFnName: true, keepFnArgs: true, keepClassName: true }],
    ],
  }).code;

  const prettyTypeTest = prettier.format(typeTest, prettierOptions);

  fs.writeFileSync(basename + '.type-test.ts', prettyTypeTest, 'utf8');
}

// processPath('./src/__test__/collection');

recursive(path.resolve(__dirname, '../src')).then(paths => {
  for (const path of paths) {
    const [match, basename] = /^(.*__test__\/.*)\.test\.js/.exec(path) || [];
    if (match) {
      processPath(basename);
    }
  }
});
