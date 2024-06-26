'use strict';

import styles from './blog.module.scss';
import { Stack } from '@/lib/client-react-bootstrap';
import { Blog, microCMSClient } from '@/lib/microcms-client';
import { iso2datetime } from '@/lib/time';
import Link from 'next/link';
import { ArrowUpCircle, FileEarmarkPlus } from 'react-bootstrap-icons';
import type { Metadata } from 'next';
import type { JSX } from 'react';

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
                    <Link href={`/blog/${post.id}`} key={post.id}>
                        <div className="tech-blog-card">
                            <h2>{post.title}</h2>
                            <div className={styles['datetime']}>
                                <span><FileEarmarkPlus /> {iso2datetime(post.createdAt)}</span>
                                <span><ArrowUpCircle /> {iso2datetime(post.updatedAt)}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </Stack>
        </>
    );
}
