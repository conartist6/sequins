const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
// const babelConfig = require('./babel.config');

function makeRollupConfig(input = 'src/index.js', output = 'dist/sequins.mjs', babelOpts = {}) {
  return {
    input,
    output: {
      file: output,
      format: 'es',
    },
    external: module => /^(iter-tools|invariant|stable|@babel\/runtime)\b/.test(module),
    plugins: [
      resolve({
        extensions: ['.mjs', '.js', '.json'],
      }),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        //...babelConfig,
        ...babelOpts,
      }),
      commonjs({
        include: 'node_modules/**',
      }),
    ],
  };
}

module.exports = makeRollupConfig;
