const _ = require('lodash');
let babelPresetEnv = require('@babel/preset-env');

babelPresetEnv = babelPresetEnv.default ? babelPresetEnv.default : babelPresetEnv;

let babelPresetReact = require('@babel/preset-react');

babelPresetReact = babelPresetReact.default ? babelPresetReact.default : babelPresetReact;

let presetTypescript = require('@babel/preset-typescript');

presetTypescript = presetTypescript.default ? presetTypescript.default : presetTypescript;

let babelPlugins = require('../../babel/plugin');

babelPlugins = babelPlugins.default ? babelPlugins.default : babelPlugins;

const defaultOptions = {
  cacheDirectory: process.env.PAW_CACHE === 'true',
};

const rule = (options = {}) => {
  const o = _.assignIn({}, defaultOptions, options);
  return {
    test: /\.(mj|j|t)sx?$/,
    exclude: [
      /node_modules\/core-js\//,
    ],
    use: [
      {
        loader: 'babel-loader',
        options: {
          retainLines: true,
          presets: [
            [
              babelPresetEnv,
              {
                useBuiltIns: 'entry',
                corejs: '3.6',
                targets: {
                  browsers: ['last 2 versions', 'safari >= 7', 'ie >= 11'],
                },
              },
            ],
            babelPresetReact,
            presetTypescript,
          ],
          cacheDirectory: o.cacheDirectory,
          plugins: babelPlugins(o),
        },
      },
      {
        loader: 'prefetch-loader',
      },
    ],
  };
};
module.exports = rule;
