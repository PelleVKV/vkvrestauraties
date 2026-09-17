const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
            },
            {
                protocol: "http",
                hostname: "192.168.178.211",
                port: "3000",
            },
            {
                protocol: "https",
                hostname: "portfolio-manager.vkvdev.com",
            },
        ],
        // Allow images served from private/loopback IPs (our Pi)
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
