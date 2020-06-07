const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: ['./src/index.js', './src/style.scss'],

  },
  output: {
    path: path.join(__dirname, './public'),
    filename: '[hash].[name].js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        loader: 'file-loader',
        options: { outputPath: 'assets/fonts' },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './node_modules/reveal.js/plugin/markdown/markdown.js', to: 'plugins/markdown.js' },
        { from: './node_modules/reveal.js/plugin/markdown/marked.js', to: 'plugins/marked.js' },
        { from: './node_modules/reveal.js/plugin/highlight/highlight.js', to: 'plugins/highlight.js' },
      ],
    }),
    new CleanWebpackPlugin({}),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].style.css',
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 4200
  }
};
