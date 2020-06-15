module.exports = {
  outDir: '../app/static',
  proxy: {
    // with options
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}