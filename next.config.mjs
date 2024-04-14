'use strict';

/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    eslint: {
        dirs: [
            'app',
            'lib'
        ]
    },
    experimental: {
        esmExternals: true,
        optimizeCss: true
    },
    generateEtags: false,
    headers: async () => [
        {
            headers: [
                {
                    key: 'access-control-allow-methods',
                    value: 'get, options, post'
                },
                {
                    key: 'access-control-allow-origin',
                    value: '*'
                },
                {
                    key: 'access-control-max-age',
                    value: '604800'
                },
                {
                    key: 'content-security-policy',
                    value: `default-src 'self'; connect-src 'self'; font-src 'self'; img-src 'self' https://images.microcms-assets.io; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'`
                },
                {
                    key: 'referrer-policy',
                    value: 'origin-when-cross-origin'
                },
                {
                    key: 'strict-transport-security',
                    value: 'max-age=31536000; preload'
                },
                {
                    key: 'x-content-type-options',
                    value: 'nosniff'
                },
                {
                    key: 'x-dns-prefetch-control',
                    value: 'on'
                },
                {
                    key: 'x-ua-compatible',
                    value: 'IE=edge'
                },
                {
                    key: 'x-xss-protection',
                    value: '1; mode=block'
                }
            ],
            source: '/:path*'
        }
    ],
    images: {
        domains: [
            'images.microcms-assets.io'
        ]
    },
    poweredByHeader: false,
    productionBrowserSourceMaps: true,
    reactProductionProfiling: true,
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: false,
    webpack: config => {
        config.module.rules.push({
            generator: {
                filename: 'bs/[hash].svg'
            },
            mimetype: 'image/svg+xml',
            scheme: 'data',
            type: 'asset/resource'
        });
        return config;
    }
};

export default nextConfig;
