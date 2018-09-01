const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/sequins.mjs',
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
    }),
    commonjs({
      include: 'node_modules/**',
    }),
  ],
};
