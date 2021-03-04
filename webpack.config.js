const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.png'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    publicPath: '/dist/',
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api/**'],
        target: 'http://localhost:3000',
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
