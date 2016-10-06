module.exports = {
    entry: './resources/assets/js/index.jsx',
    output: {
        filename: 'public/js/index.js',
    },
    module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
}
