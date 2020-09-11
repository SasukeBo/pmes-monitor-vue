module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  filenameHashing: true,
  devServer: {
    public: 'localhost:8080'
  },
  pages: {
    monitor: {
      entry: 'src/main.js',
      filename: 'index.html'
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('file-loader')
      .tap((options) => {
        options.name = 'img/monitor/[name].[ext]'
        return options
      })
  }
}
