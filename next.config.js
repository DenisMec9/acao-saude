/** @type {import('next').NextConfig} */
const webpack = require('webpack');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'parsefiles.back4app.com',
      },
    ],
  },
  
  webpack: (config, { isServer }) => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^bufferutil$/ }),
      new webpack.IgnorePlugin({ resourceRegExp: /^utf-8-validate$/ })
    );

    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules[\\/]ws[\\/]/, message: /bufferutil/ },
      { module: /node_modules[\\/]ws[\\/]/, message: /utf-8-validate/ },
    ];

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        dns: false,
        child_process: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;