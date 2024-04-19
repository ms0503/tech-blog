'use strict';

import styles from '../../blog.module.scss';
import { Stack } from '@/lib/client-react-bootstrap';
import { Blog, microCMSClient, Tag } from '@/lib/microcms-client';
import { iso2datetime } from '@/lib/time';
import Link from 'next/link';
import { ArrowUpCircle, FileEarmarkPlus } from 'react-bootstrap-icons';
import type { PropsWithParams } from '@/lib/types';
import type { Metadata } from 'next';
import type { JSX } from 'react';

type Params = {
    id: string
};

export default async function TagPage({ params: { id } }: PropsWithParams<Params>): Promise<JSX.Element> {
    const tag: Tag = await microCMSClient.get<Tag>({
        contentId: id,
        endpoint: 'tags'
    });
    const blog: Blog[] = (await microCMSClient.getList<Blog>({
        endpoint: 'blogs',
        queries: {
            filters: `tags[contains]${id}`
        }
    })).contents;
    return (
        <>
            <h1>「{tag.name}」タグの記事一覧</h1>
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

export async function generateMetadata({ params: { id } }: PropsWithParams<Params>): Promise<Metadata> {
    const { name }: Tag = await microCMSClient.get<Tag>({
        contentId: id,
        endpoint: 'tags'
    });
    return {
        description: 'STM32系・Web系の技術ブログ',
        openGraph: {
            description: 'STM32系・Web系の技術ブログ',
            title: `「${name}」カテゴリー`,
            type: 'website'
        },
        title: `「${name}」カテゴリー`
    };
}

export async function generateStaticParams(): Promise<Params[]> {
    const tags: Tag[] = (await microCMSClient.getList<Tag>({
        endpoint: 'tags'
    })).contents;
    return tags.map(tag => ({
        id: tag.id
    }));
}
