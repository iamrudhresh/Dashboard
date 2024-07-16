// webpack.config.js
module.exports = {
    // Other webpack configuration settings...
    resolve: {
      fallback: {
        "os": require.resolve("os-browserify/browser")
      }
    }
  };
  