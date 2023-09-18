'use strict';

import Link from 'next/link';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';
import { Blog, microCMSClient } from '@/lib/microcms-client';
import { Feed } from 'feed';
import { Fragment, createElement } from 'react';
import { Image } from '@/app/components';
import { processer } from 'microcms-richedit-processer';
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
    const baseUrl: string = 'https://tech-blog-ms0503.vercel.app';
    const date: Date = new Date();
    const author: Author = {
        email: 'ms0503@outlook.com',
        link: 'https://tech-blog-ms0503.vercel.app',
        name: 'Sora Tonami'
    };
    const feed: Feed = new Feed({
        author,
        copyright: 'Copyright © 2023 Sora Tonami. All rights reserved.',
        description: 'STM32系・Web系の技術ブログ',
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
    if(blog.length === 0) return feed;
    for(const post of blog) {
        const content: string = unified().use(rehypeParse, {
            fragment: true
            // @ts-ignore
        }).use(rehypeReact, {
            Fragment,
            components: {
                a: Link,
                img: Image
            },
            createElement
        }).use(rehypeStringify).processSync(await processer(post.content, {
            code: {
                enabled: true
            },
            iframe: {
                enabled: true
            },
            img: {
                enabled: true
            }
        })).result as string;
        const url: string = `${baseUrl}/blog/${post.id}`;
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
