const webpack = require("webpack");
const path = require('path');
const {spawn} = require('child_process');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src');

module.exports = (env, argv) => {
  const mode = argv.mode

  const base = {
    mode: mode,
    devtool: mode === 'production' ? 'source-map' : 'eval-source-map',
    resolve: {
      alias: {
        ['@']: SRC_DIR
      },
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    output: {
      path: DIST_DIR,
    },
    plugins: [
      new webpack.EnvironmentPlugin("APP_ENV")
    ],
    devServer: {
      contentBase: DIST_DIR,
      writeToDisk: true,
      port: 3000,
      after() {
        spawn(
          'electron',
          ['./dist/main.js'],
          { shell: true, env: process.env, stdio: 'inherit' }
        )
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError))
      }
    }
  }

  const electron = {
    entry: './src/main.ts',
    target: 'electron-main',
    optimization: {
      nodeEnv: 'electron'
    },
    output: {
      filename: 'main.js'
    },
    plugins: [new CleanWebpackPlugin()]
  }
   
  const react = {
    entry: './src/renderer.tsx',
    target: 'electron-renderer',
    optimization: {
      nodeEnv: 'web'
    },
    output: {
      filename: 'renderer.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
  }
  
  return [
    merge(base, electron),
    merge(base, react),
  ]
};