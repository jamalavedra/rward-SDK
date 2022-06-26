module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["rward.xyz"],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      buffer: false,
      process: false,
    };
    return config;
  },
};
