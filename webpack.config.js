var path = require('path');
var webpack = require('webpack');

var loaders = [
  {
    "test": /\.js?$/,
    "exclude": /node_modules/,
    "loader": "babel",
    "query": {
      "presets": [
        "es2015",
        "react",
        "stage-0"
      ],
      "plugins": []
    }
  }
];

module.exports = {
  devtool: 'none',
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('public'),
    filename: 'iceflow.js',
    publicPath: '/'
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('"production"')
      }
    })
  ],
  module: {
    loaders: loaders
  },
  devServer: {
    contentBase:"./public/",
    host: "0.0.0.0",
    proxy: [{
      path: '/api/*',
      target: 'http://localhost:9999'
    }]
  }
};
