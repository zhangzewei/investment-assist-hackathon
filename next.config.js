module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_PATH}/:path*` // Proxy to Backend
      }
    ]
  }
};
