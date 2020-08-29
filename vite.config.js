const path = require('path')

module.exports = {
  outDir: '../app/static',
  alias: {
    '/@/': path.resolve(__dirname, 'src'),
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
}
