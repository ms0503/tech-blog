'use strict';

/** @type {import('next-sitemap').IConfig} */
const config = {
    autoLastmod: true,
    changefreq: 'daily',
    exclude: [
        '/4*',
        '/5*',
        '/atom.xml',
        '/blog/*',
        '/blog-sitemap.xml',
        '/feed.json',
        '/rss.xml'
    ],
    generateIndexSitemap: true,
    generateRobotsTxt: true,
    outDir: 'public',
    priority: 0.7,
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://ms0503-tech-blog.vercel.app/blog-sitemap.xml'
        ],
        includeNonIndexSitemaps: false,
        policies: [
            {
                allow: '/',
                userAgent: '*'
            }
        ]
    },
    siteUrl: 'https://ms0503-tech-blog.vercel.app',
    sitemapBaseFileName: 'sitemap',
    sitemapSize: 5000,
    sourceDir: '.next'
};

export default config;
