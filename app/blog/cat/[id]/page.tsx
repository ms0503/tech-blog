'use strict';

import Link from 'next/link';
import { Blog, Category, microCMSClient } from '@/lib/microcms-client';
import { Stack } from '@/lib/client-react-bootstrap';
import { iso2datetime } from '@/lib/time';
import type { JSX } from 'react';
import type { Metadata } from 'next';

type Props = {
    params: {
        id: string
    }
};

export default async function CategoryPage({ params: { id } }: Props): Promise<JSX.Element> {
    const cat: Category = await microCMSClient.get<Category>({
        contentId: id,
        endpoint: 'categories'
    });
    const blog: Blog[] = (await microCMSClient.getList<Blog>({
        endpoint: 'blogs',
        queries: {
            filters: `category[equals]${id}`
        }
    })).contents;
    return (
        <>
            <h1>「{cat.name}」カテゴリーの記事一覧</h1>
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

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
    const { name }: Category = await microCMSClient.get<Category>({
        contentId: id,
        endpoint: 'categories'
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
