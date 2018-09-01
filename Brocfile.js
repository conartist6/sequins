const mergeTrees = require('broccoli-merge-trees');
const esTranspiler = require('broccoli-babel-transpiler');
const resolve = require('rollup-plugin-node-resolve');
const Rollup = require('broccoli-rollup');
const makeRollupConfig = require('./config/rollup.configfactory');

let es = 'src';

let bundledModule = new Rollup(es, {
  rollup: makeRollupConfig('index.js', 'sequins.mjs'),
});
let bundledCJS = new Rollup(es, {
  rollup: makeRollupConfig('index.js', 'sequins.js', {
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          useESModules: false,
        },
      ],
    ],
  }),
});

bundledCJS = esTranspiler(bundledCJS, {
  filterExtensions: ['js'],
  plugins: ['@babel/plugin-transform-modules-commonjs'],
});

module.exports = mergeTrees([bundledModule, bundledCJS, 'compat']);
