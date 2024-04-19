'use strict';

import styles from '../../blog.module.scss';
import { Stack } from '@/lib/client-react-bootstrap';
import { Blog, Category, microCMSClient } from '@/lib/microcms-client';
import { iso2datetime } from '@/lib/time';
import Link from 'next/link';
import { ArrowUpCircle, FileEarmarkPlus } from 'react-bootstrap-icons';
import type { PropsWithParams } from '@/lib/types';

type Params = {
    id: string
};

export default async function CategoryPage({ params: { id } }: PropsWithParams<Params>) {
    const cat = await microCMSClient.get<Category>({
        contentId: id,
        endpoint: 'categories'
    });
    const blogs = (await microCMSClient.getList<Blog>({
        endpoint: 'blogs',
        queries: {
            filters: `category[equals]${id}`
        }
    })).contents;
    return (
        <>
            <h1>「{cat.name}」カテゴリーの記事一覧</h1>
            <Stack gap={2}>
                {blogs.map(post => (
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

export async function generateMetadata({ params: { id } }: PropsWithParams<Params>) {
    const { name } = await microCMSClient.get<Category>({
        contentId: id,
        endpoint: 'categories'
    });
    return {
        openGraph: {
            title: `「${name}」カテゴリー`,
            type: 'website'
        },
        title: `「${name}」カテゴリー`
    };
}

export async function generateStaticParams(): Promise<Params[]> {
    const cats: Category[] = (await microCMSClient.getList<Category>({
        endpoint: 'categories'
    })).contents;
    return cats.map(cat => ({
        id: cat.id
    }));
}
