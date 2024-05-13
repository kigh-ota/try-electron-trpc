import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';
import path from 'node:path';
import babelConfig from './babel.config.js';

const TS_MODULE = {
  rules: [
    {
      test: /\.ts$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: babelConfig.presets,
        },
      },
    },
  ],
};

const config: webpack.Configuration[] = [
  {
    target: 'electron-main',
    entry: './main.ts',
    output: {
      path: path.join(__dirname, 'generated'),
      filename: 'main.js',
    },
    module: TS_MODULE,
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['./generated'],
      }),
    ],
  },
  {
    target: 'web', // nodeIntegration: false ならば electron-renderer は使ってはいけない
    entry: './renderer.ts',
    output: {
      path: path.join(__dirname, 'generated'),
      filename: 'renderer.js',
    },
    module: TS_MODULE,
    resolve: {
      extensions: ['.ts', '.js'],
    },
    // ts-arch が dependencies に path を追加してくるので、path-browserify への fallback が効かなくなった
    // ui/server 共通のコードでは path を使わないことにし、ui では path-browserify を直接使うことにする
    plugins: [new webpack.IgnorePlugin({ resourceRegExp: /path$/ })],
  },
];

export default config;
