const mergeTrees = require('broccoli-merge-trees');
const esTranspiler = require('broccoli-babel-transpiler');
const resolve = require('rollup-plugin-node-resolve');
const Rollup = require('broccoli-rollup');
const rollupConfig = require('./rollup.config.js');

let es = 'src';

let bundledModule = new Rollup(es, {
  rollup: {
    ...rollupConfig,
    input: 'index.js',
    output: {
      ...rollupConfig.output,
      file: 'sequins.mjs',
    },
  },
});

let bundledCJS = esTranspiler(bundledModule, {
  filterExtensions: ['mjs'],
  plugins: [['@babel/plugin-transform-modules-commonjs', { loose: true, strict: true }]],
});

module.exports = mergeTrees([bundledModule, bundledCJS, 'compat']);
