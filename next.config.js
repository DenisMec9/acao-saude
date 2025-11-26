/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'parsefiles.back4app.com'  // ← ADICIONE ESTA LINHA
    ],
  },
};

module.exports = nextConfig;