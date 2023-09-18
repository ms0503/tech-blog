'use strict';

import { Blog, microCMSClient } from '@/lib/microcms-client';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl: string = 'https://tech-blog-ms0503.vercel.app';
    const staticPaths: MetadataRoute.Sitemap = [
        {
            changeFrequency: 'monthly',
            lastModified: '20230919T050000+0900',
            priority: 1,
            url: baseUrl
        },
        {
            changeFrequency: 'weekly',
            lastModified: '20230919T050000+0900',
            priority: 0.8,
            url: `${baseUrl}/blog`
        },
        {
            changeFrequency: 'monthly',
            lastModified: '20230919T050000+0900',
            priority: 0.5,
            url: `${baseUrl}/blog/cat`
        },
        {
            changeFrequency: 'monthly',
            lastModified: '20230919T050000+0900',
            priority: 0.5,
            url: `${baseUrl}/blog/tag`
        }
    ];
    const blog: Blog[] = (await microCMSClient.getList<Blog>({
        endpoint: 'blogs'
    })).contents;
    const dynamicPaths: MetadataRoute.Sitemap = blog.map(post => ({
        changeFrequency: 'weekly',
        lastModified: post.updatedAt,
        priority: 0.7,
        url: `${baseUrl}/blog/${post.id}`
    }));
    return [
        ...staticPaths,
        ...dynamicPaths
    ];
}
