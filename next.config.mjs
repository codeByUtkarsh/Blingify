/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable CSS minification temporarily to isolate the issue
  webpack(config, { isServer }) {
    if (!isServer) {
      // Disable the CSS minification during production build
      config.optimization.minimizer = [];
    }
    return config;
  },

  // Enable future Webpack optimizations if needed
  future: {
    webpack5: true, // Ensure webpack 5 is used
  },

  // Optionally, enable source maps for debugging purposes (but disable in production for performance)
  productionBrowserSourceMaps: true,
};

export default nextConfig;
