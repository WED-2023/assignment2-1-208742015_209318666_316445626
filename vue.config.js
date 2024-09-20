module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    host: "localhost",
    
    // host: "132.72.65.211"
    // host: "http://BahaaR.cs.bgu.ac.il/"
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"

};
