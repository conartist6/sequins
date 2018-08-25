const esTranspiler = require('broccoli-babel-transpiler');
const Rollup = require('broccoli-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

let es = 'src';
es = esTranspiler(es, {
  filterExtensions: ['js'],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
  ],
  plugins: ['@babel/plugin-external-helpers'],
});

module.exports = es;

let bundled = new Rollup(es, {
  rollup: {
    input: 'index.js',
    output: {
      file: 'sequins.js',
      format: 'es',
    },
    plugins: [
      resolve({
        extensions: ['.mjs', '.js', '.json'],
      }),

      commonjs({
        include: ['node_modules/memoizee', 'node_modules/invariant'],
      }),
    ],
  },
});

// module.exports = bundled;
