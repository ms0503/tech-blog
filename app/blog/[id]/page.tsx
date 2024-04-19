'use strict';

import styles from '../blog.module.scss';
import { BlogBody } from '@/app/components/BlogBody';
import { Col, Container, Row } from '@/lib/client-react-bootstrap';
import { Blog, microCMSClient } from '@/lib/microcms-client';
import { iso2datetime } from '@/lib/time';
import { ArrowUpCircle, Box, FileEarmarkPlus, Tags } from 'react-bootstrap-icons';
import type { PropsWithParams } from '@/lib/types';
import type { ResolvingMetadata } from 'next';

type Params = {
    id: string
};

export default async function BlogPage({ params: { id } }: PropsWithParams<Params>) {
    const post = await microCMSClient.get<Blog>({
        contentId: id,
        endpoint: 'blogs'
    });
    return (
        <>
            <h1>{post.title}</h1>
            <Container>
                <Row className={styles['blog-metadata']} lg={6}>
                    <Col as="small" title="記事作成日時"><FileEarmarkPlus /> {iso2datetime(post.createdAt)}</Col>
                    <Col as="small" title="最終更新日時"><ArrowUpCircle /> {iso2datetime(post.updatedAt)}</Col>
                </Row>
                <Row className={styles['blog-metadata']} lg={6}>
                    <Col as="small" title="カテゴリー"><Box /> {post.category.name}</Col>
                    <Col as="small" title="タグ"><Tags /> {post.tags.length === 0 ? 'なし' : post.tags.map(tag => tag.name).join(', ')}</Col>
                </Row>
            </Container>
            <BlogBody body={post.content} />
        </>
    );
}

export async function generateMetadata({ params: { id } }: PropsWithParams<Params>, parent: ResolvingMetadata) {
    const { description, eyecatch, title } = await microCMSClient.get<Blog>({
        contentId: id,
        endpoint: 'blogs'
    });
    const images = (await parent).openGraph?.images ?? [];
    if(eyecatch?.default_image.url) {
        images.unshift(eyecatch?.default_image.url);
    }
    return {
        description,
        openGraph: {
            description,
            images,
            title
        },
        title
    };
}

export async function generateStaticParams() {
    const blogs = (await microCMSClient.getList<Blog>({
        endpoint: 'blogs'
    })).contents;
    return blogs.map(post => ({
        id: post.id
    }));
}
