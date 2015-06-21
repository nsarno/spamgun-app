var path = require('path');

var entry_path = path.resolve(path.join('scripts', 'components', 'App.jsx'));
var dist_path = path.resolve('dist');
var components_path = path.resolve(path.join('scripts', 'components'));

var config = {
  entry: entry_path,
  output: {
    path: dist_path,
    filename: 'bundle.js'
  },
  resolve: {
    root: components_path,
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?optional[]=es7.objectRestSpread' },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel?optional[]=es7.objectRestSpread' }
    ]
  }
}

module.exports = config;
