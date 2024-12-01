/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      // Disable CSS minification during production build
      config.optimization.minimizer = [];
    }
    return config;
  },
  // Other configurations as needed
};

export default nextConfig;
