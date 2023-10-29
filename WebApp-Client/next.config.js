/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'localhost:8000'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};
