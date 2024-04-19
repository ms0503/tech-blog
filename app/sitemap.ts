'use strict';

import { Blog, Category, microCMSClient, Tag } from '@/lib/microcms-client';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl: string = process.env['BASE_URL']!;
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
    const blogs = (await microCMSClient.getList<Blog>({
        endpoint: 'blogs'
    })).contents;
    const categories = (await microCMSClient.getList<Category>({
        endpoint: 'categories'
    })).contents;
    const tags = (await microCMSClient.getList<Tag>({
        endpoint: 'tags'
    })).contents;
    const blogPaths: MetadataRoute.Sitemap = blogs.map(post => ({
        changeFrequency: 'weekly',
        lastModified: post.updatedAt,
        priority: 0.7,
        url: `${baseUrl}/blog/${post.id}`
    }));
    const categoryPaths: MetadataRoute.Sitemap = categories.map(cat => ({
        changeFrequency: 'monthly',
        lastModified: cat.updatedAt,
        priority: 0.7,
        url: `${baseUrl}/cat/${cat.id}`
    }));
    const tagPaths: MetadataRoute.Sitemap = tags.map(tag => ({
        changeFrequency: 'monthly',
        lastModified: tag.updatedAt,
        priority: 0.7,
        url: `${baseUrl}/tag/${tag.id}`
    }));
    return [
        ...staticPaths,
        ...blogPaths,
        ...categoryPaths,
        ...tagPaths
    ];
}
