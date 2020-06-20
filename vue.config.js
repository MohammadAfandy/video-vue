module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_BASE_URL || 'http://127.0.0.1:8000',
        pathRewrite: {'^/api' : ''}
      }
    }
  }
}