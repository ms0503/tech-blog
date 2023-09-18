'use strict';

import Link from 'next/link';
import { Category, microCMSClient } from '@/lib/microcms-client';
import { Stack } from '@/lib/client-react-bootstrap';
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
            <Stack gap={2}>
                {cats.map(cat => <Link key={cat.id} href={`/blog/cat/${cat.id}`}>{cat.name}</Link>)}
            </Stack>
        </>
    );
}
