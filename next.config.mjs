/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        RAILWAY_API_URL: process.env.RAILWAY_API_URL
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "media.rawg.io",
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: "pbs.twimg.com",
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: "images.unsplash.com",
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: "res.cloudinary.com",
                pathname: '**',
            },
        ],
    }
};

export default nextConfig;
