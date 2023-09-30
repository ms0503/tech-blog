'use strict';

import Link from 'next/link';
import { ArrowUpCircle, Box, FileEarmarkPlus, Tags } from 'react-bootstrap-icons';
import { Blog, microCMSClient } from '@/lib/microcms-client';
import { Col, Container, Row, Stack } from '@/lib/client-react-bootstrap';
import { iso2datetime } from '@/lib/time';
import type { JSX } from 'react';
import type { Metadata } from 'next';
import styles from '@/app/blog/[id]/Blog.module.scss';

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
                        <Container className={styles['blog-entry']}>
                            <Row>
                                <Col as="h2">{post.title}</Col>
                            </Row>
                            <Row className={styles['blog-metadata']} lg={6}>
                                <Col as="small" title="記事作成日時"><FileEarmarkPlus /> {iso2datetime(post.createdAt)}</Col>
                                <Col as="small" title="最終更新日時"><ArrowUpCircle /> {iso2datetime(post.updatedAt)}</Col>
                            </Row>
                            <Row className={styles['blog-metadata']} lg={6}>
                                <Col as="small" title="カテゴリー"><Box /> {post.category.name}</Col>
                                <Col as="small" title="タグ"><Tags /> {post.tags.length === 0 ? 'なし' : post.tags.map(tag => tag.name).join(', ')}</Col>
                            </Row>
                        </Container>
                    </Link>
                ))}
            </Stack>
        </>
    );
}
