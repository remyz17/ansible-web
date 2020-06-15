const path = require('path')

module.exports = {
  outDir: '../app/static',
  alias: {
    '/@/': path.resolve(__dirname, 'src')
  },
  proxy: {
    // with options
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}