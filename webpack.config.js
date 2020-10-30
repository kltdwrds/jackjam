const path = require('path');
const {spawn} = require('child_process');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require("dotenv-webpack");

var DIST_DIR = path.resolve(__dirname, 'dist');
// var SRC_DIR = path.resolve(__dirname, 'src');

module.exports = (env, argv) => {
  const mode = argv.mode
  const productionBuild = mode === 'production';
  const base = {
    mode: mode,
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
          resolve: {
            fullySpecified: false
          }
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
          resolve: {
            fullySpecified: false
          }
        }
      ]
    },
    output: {
      path: DIST_DIR,
    },
    plugins: [
      new DotenvWebpackPlugin({path: productionBuild ? "./.env.production" : "./.env"})
    ]
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
    plugins: [new CleanWebpackPlugin()],
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
  
  return [
    merge(base, electron),
    merge(base, react),
  ]
};