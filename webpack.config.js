const path = require('path');
const { spawn } = require('child_process');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, 'dist');
// var SRC_DIR = path.resolve(__dirname, 'src');

module.exports = (env, argv) => {
  const mode = argv.mode
  const productionBuild = mode === 'production';
  const base = {
    mode,
    devtool: productionBuild ? 'source-map' : 'eval-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        }
      ]
    },
    output: {
      path: DIST_DIR,
    },
  }

  const electron = {
    entry: {
      main: './src/main.ts',
    },
    output: {
      filename: '[name].js'
    },
    target: 'electron-main',
    optimization: {
      nodeEnv: 'electron'
    },
    plugins: [new CleanWebpackPlugin()],
  }
   
  const react = {
    entry: {
      renderer: './src/renderer.tsx',
    },
    output: {
      filename: '[name].js'
    },
    target: 'electron-renderer',
    optimization: {
      nodeEnv: 'web'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
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
        .on('error', error => console.error(error))
      }
    }
  }
  
  return [
    merge(base, electron),
    merge(base, react),
  ]
};