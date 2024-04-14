'use strict';

import { Image } from '@/app/components/Image';
import { Blog, microCMSClient } from '@/lib/microcms-client';
import { Feed } from 'feed';
import { processer } from 'microcms-richedit-processer';
import Link from 'next/link';
import { createElement, Fragment } from 'react';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

type Author = {
    email: string,
    link: string,
    name: string
};

export async function generateAtomXml(): Promise<string> {
    return (await generateFeed()).atom1();
}

export async function generateFeedJson(): Promise<string> {
    return (await generateFeed()).json1();
}

export async function generateRssXml(): Promise<string> {
    return (await generateFeed()).rss2();
}

async function generateFeed(): Promise<Feed> {
    const baseUrl: string = process.env['BASE_URL']!;
    const date: Date = new Date();
    const author: Author = {
        email: 'ms0503@outlook.com',
        link: 'https://ms0503-tech-blog.vercel.app',
        name: 'Sora Tonami'
    };
    const feed: Feed = new Feed({
        author,
        copyright: `Copyright © 2023-${date.getFullYear()} Sora Tonami. All rights reserved.`,
        description: 'JK(情報系高専生)の技術ブログ',
        feedLinks: {
            atom: `${baseUrl}/atom.xml`,
            json: `${baseUrl}/feed.json`,
            rss2: `${baseUrl}/rss.xml`
        },
        id: baseUrl,
        image: `${baseUrl}/icon-512.png`,
        language: 'ja',
        link: baseUrl,
        title: 'ms0503 Tech Blog',
        updated: date
    });
    const blog: Blog[] = (await microCMSClient.getList<Blog>({
        endpoint: 'blogs'
    })).contents;
    if(blog.length === 0) {
        return feed;
    }
    for(const post of blog) {
        const url: string = `${baseUrl}/blog/${post.id}`;
        const content = (await unified().use(rehypeParse, {
            fragment: true
            // @ts-ignore
        }).use(rehypeReact, {
            Fragment,
            components: {
                a: Link,
                img: Image
            },
            createElement
        }).use(rehypeStringify).process(await processer(post.content, {
            code: {
                enabled: true
            },
            iframe: {
                enabled: true
            },
            img: {
                enabled: true
            }
        }))).result as string;
        feed.addItem({
            content,
            date: new Date(post.updatedAt),
            description: post.description,
            id: url,
            link: url,
            title: `${post.title} - ms0503 Tech Blog`
        });
    }
    return feed;
}
