const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    "assert": require.resolve("assert/"),
    "buffer": require.resolve("buffer/"),
    "crypto": require.resolve("crypto-browserify"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "path": require.resolve("path-browserify"),
    "querystring": require.resolve("querystring-es3"),
    "stream": require.resolve("stream-browserify"),
    "url": require.resolve("url/"),
    "util": require.resolve("util/"),
    "zlib": require.resolve("browserify-zlib"),
    "vm": require.resolve("vm-browserify"),
    "child_process": false,
    "fs": false,
    "http2": false,
    "net": false,
    "tls": false,
    "dns": false
  };

  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'node-fetch': require.resolve('cross-fetch'),
    'node:zlib': require.resolve('browserify-zlib'), // Explicitly alias node:zlib
  };

  config.plugins = (
    config.plugins || []
  ).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);
  
  config.ignoreWarnings = [/Failed to parse source map/];

  return config;
}