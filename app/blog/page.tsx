'use strict';

import Link from 'next/link';
import { Blog, microCMSClient } from '@/lib/microcms-client';
import { Stack } from '@/lib/client-react-bootstrap';
import { iso2datetime } from '@/lib/time';
import type { JSX } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    description: 'STM32系・Web系の技術ブログ',
    openGraph: {
        description: 'STM32系・Web系の技術ブログ',
        title: 'Blog',
        type: 'website'
    },
    title: 'Blog'
};

export default async function BlogHome(): Promise<JSX.Element> {
    const blog: Blog[] = (await microCMSClient.getList<Blog>({
        endpoint: 'blogs'
    })).contents;
    return (
        <>
            <h1>記事一覧</h1>
            <Stack gap={2}>
                {blog.map(post => (
                    <div key={post.id}>
                        <h2><Link href={`/blog/${post.id}`}>{post.title}</Link></h2>
                        <span>{iso2datetime(post.createdAt)}</span>
                        <span>{iso2datetime(post.updatedAt)}</span>
                    </div>
                ))}
            </Stack>
        </>
    );
}
