'use strict';

import Link from 'next/link';
import styles from '../blog.module.scss';
import { Tag, microCMSClient } from '@/lib/microcms-client';
import type { JSX } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    description: 'STM32系・Web系の技術ブログ',
    openGraph: {
        description: 'STM32系・Web系の技術ブログ',
        title: 'Tags',
        type: 'website'
    },
    title: 'Tags'
};

export default async function Tags(): Promise<JSX.Element> {
    const tags: Tag[] = (await microCMSClient.getList<Tag>({
        endpoint: 'tags'
    })).contents;
    return (
        <>
            <h1>タグ</h1>
            <div className={styles['list']}>
                {tags.map(tag => (
                    <Link href={`/blog/tag/${tag.id}`} key={tag.id}>
                        <div className="tech-blog-card">
                            {tag.name}
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
