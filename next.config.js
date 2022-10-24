const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "platform-lookaside.fbsbx.com",
      "static.neris-assets.com",
      "scontent-iad3-1.xx.fbcdn.net",
      "i.scdn.co",
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "./ai",
            to: "ai",
          },
        ],
      })
    );

    return config;
  },
};

module.exports = nextConfig;
