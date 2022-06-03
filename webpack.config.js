const HtmlWebPackPlugin = require("html-webpack-plugin");
const { webpack, DefinePlugin, } = require("webpack");
const dotenv = require('dotenv');


const htmlPlugin = new HtmlWebPackPlugin({
title: "married in app",
 template: "./src/index.html",
 filename: "./index.html",
 favicon: "./src/assets/logoCropped.jpg",
 meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
});

//call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;
 // reduce it to a nice object, the same as before
 const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {

devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
},
  mode: 'development',
  module: {
    rules: [
      {
        test:/\.graphql?$/, 
        loader: 'webpack-graphql-loader',
      },
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
  {
   test: /\.css$/,
   use: [
     "style-loader",
     {
       loader: "css-loader",
       options: {
         importLoaders: 1,
         modules: true,
       }
     }, 
    ]
  },
  {
    test: /\.(png|jpe?g|gif|mp4)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
]},
 plugins: [
   htmlPlugin,
   new DefinePlugin(envKeys)
  ]
};