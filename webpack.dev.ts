import common from './webpack.common';
import webpack from 'webpack';

const config: webpack.Configuration[] = common.map((cfg) => ({
  ...cfg,
  mode: 'development',
  devtool: 'inline-source-map',
}));

export default config;
