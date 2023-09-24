'use strict';

import styles from './Blog.module.scss';
import { ArrowUpCircle, Box, FileEarmarkPlus, Tags } from 'react-bootstrap-icons';
import { Blog, microCMSClient } from '@/lib/microcms-client';
import { BlogBody } from '@/app/components';
import { Col, Container, Row } from '@/lib/client-react-bootstrap';
import { iso2datetime } from '@/lib/time';
import type { JSX } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';

type Params = {
    id: string
};

type Props = {
    params: Params
};

export default async function BlogPage({ params: { id } }: Props): Promise<JSX.Element> {
    const post: Blog = await microCMSClient.get<Blog>({
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

export async function generateMetadata({ params: { id } }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { description, eyecatch, title }: Blog = await microCMSClient.get<Blog>({
        contentId: id,
        endpoint: 'blogs'
    });
    const images = (await parent).openGraph?.images ?? [];
    if(eyecatch?.default_image.url) images.unshift(eyecatch?.default_image.url);
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

export async function generateStaticParams(): Promise<Params[]> {
    const blog: Blog[] = (await microCMSClient.getList<Blog>({
        endpoint: 'blogs'
    })).contents;
    return blog.map(post => ({
        id: post.id
    }));
}
