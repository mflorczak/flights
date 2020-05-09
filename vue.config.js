module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
     '/api/*': {
        target: 'http://localhost:8080',
        secure: true,
        changeOrigin:true,
        ws: true
      }
    }
  }
};
