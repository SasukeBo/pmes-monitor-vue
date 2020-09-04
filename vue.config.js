module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  filenameHashing: true,
  pages: {
    monitor: {
      entry: 'src/main.js',
      filename: 'index.html'
    }
  }
}
