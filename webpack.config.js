var path = require('path');

var entry_path = path.resolve(path.join(__dirname, 'scripts', 'components', 'App.jsx'));
var dist_path = path.resolve('dist');
var root = [
  path.resolve(path.join(__dirname, 'scripts', 'components')),
  path.resolve(path.join(__dirname, 'scripts', 'stores')),
  path.resolve(path.join(__dirname, 'scripts', 'dispatcher')),
  path.resolve(path.join(__dirname, 'scripts', 'services')),
  path.resolve(path.join(__dirname, 'scripts', 'actions')),
  path.resolve(path.join(__dirname, 'scripts', 'constants'))
];

var config = {
  entry: entry_path,
  output: {
    path: dist_path,
    filename: 'bundle.js'
  },
  resolve: {
    root: root,
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
