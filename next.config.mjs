/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/dash/:path',
                destination: 'http://192.168.20.72:12010/api/dash/:path',
              },
        ]
    }
};

export default nextConfig;
