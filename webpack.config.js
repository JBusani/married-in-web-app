const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
title: "married in app",
 template: "./src/index.html",
 filename: "./index.html",
 favicon: "",
 meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
});
module.exports = {

devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
},
mode: 'development',
  module: {
    rules: [{
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
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
]},
 plugins: [htmlPlugin]
};