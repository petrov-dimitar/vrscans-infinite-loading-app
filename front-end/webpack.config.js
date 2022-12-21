/** @format */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '*'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  output: {
    path: path.join(__dirname, '/dist'), // the bundle output path
    filename: 'bundle.js' // the name of the bundle
  },
  plugins: [
    new ESLintPlugin({
      files: 'src/**/*.(js|jsx|ts|tsx)',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      overrideConfigFile: '.eslintrc.json',
      lintDirtyModulesOnly: true,
      emitError: true,
      emitWarning: true,
      failOnError: false,
      failOnWarning: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html' // to import index.html file inside index.js
    })
  ],
  devServer: {
    port: 3030 // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: 'url-loader',
        options: { limit: false }
      }
    ]
  }
};
