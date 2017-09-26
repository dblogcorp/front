var webpack = require('webpack');

module.exports = (env) => {
  const appName = env.app;
  
  return {
    entry: `./src/apps/${appName}/index.tsx`,
    output: {
      path: `${__dirname}/dist/${appName}`,
      filename: "bundle.[chunkhash:8].js"
    },
    
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
      extensions: [".ts", ".tsx", ".js", "jsx", ".json"]
    },

    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader"  
        },
        {
          test: /\.js?$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ['react', 'es2015']
          }
        }
      ]
    }
  }
};