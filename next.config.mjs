/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // This is the wildcard for any hostname
            },
            {
                protocol: 'http',
                hostname: '**', // Also add for http if you need it
            },
        ],
    },
};

export default nextConfig;