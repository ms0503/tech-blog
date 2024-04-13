'use strict';

import Link from 'next/link';
import styles from '../blog.module.scss';
import { Category, microCMSClient } from '@/lib/microcms-client';
import type { JSX } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    description: 'STM32系・Web系の技術ブログ',
    openGraph: {
        description: 'STM32系・Web系の技術ブログ',
        title: 'Categories',
        type: 'website'
    },
    title: 'Categories'
};

export default async function Categories(): Promise<JSX.Element> {
    const cats: Category[] = (await microCMSClient.getList<Category>({
        endpoint: 'categories'
    })).contents;
    return (
        <>
            <h1>カテゴリー</h1>
            <div className={styles['list']}>
                {cats.map(cat => (
                    <Link href={`/blog/cat/${cat.id}`} key={cat.id}>
                        <div className="tech-blog-card">
                            {cat.name}
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
