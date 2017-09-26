const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = path.resolve(__dirname);

module.exports = (env) => {
  const appName = env.app;
  
  return {
    entry: `${ROOT}/src/apps/${appName}/index.tsx`,
    output: {
      path: `${ROOT}/dist/${appName}`,
      filename: "bundle.[chunkhash:8].js",
      publicPath: `/dist/${appName}`
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
    },

    plugins: [
      new HtmlWebpackPlugin({  // Also generate a test.html 
        filename: `${ROOT}/dist/src/apps/${appName}/index.html`,
        template: `${ROOT}/dist/src/apps/${appName}/index.html`,
      })
    ]
  }
};