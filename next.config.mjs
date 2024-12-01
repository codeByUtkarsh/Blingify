/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.minimizer = [];
    }
    return config;
  },

  images: {
    domains: ["fakestoreapi.com"],
  },
};

export default nextConfig;
