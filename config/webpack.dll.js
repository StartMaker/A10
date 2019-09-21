const path = require('path');
const webpack = require('webpack');
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: {
    vendors: ["react-helmet", "antd", "react", "redux", "react-redux", "react-router", "react-router-dom", "react-dom"]
  },
  output: {
    path: path.resolve(__dirname, './dll'),
    filename: '[name].dll.js',
    library: '[name]_dll_lib'
  },
  plugins: [
    new FirendlyErrorePlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, './dll', '[name].manifest.json'),
      name: '[name]_dll_lib'
    })
  ]
};