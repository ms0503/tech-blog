'use strict';

import Link from 'next/link';
import pageStyles from '@/app/page.module.scss';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import styles from './Blog.module.scss';
import { ArrowUpCircle, Box, FileEarmarkPlus, Tags } from 'react-bootstrap-icons';
import { Blog, microCMSClient } from '@/lib/microcms-client';
import { Col, Container, Row, Stack } from '@/lib/client-react-bootstrap';
import { Fragment, JSX, createElement } from 'react';
import { Image } from '@/app/components';
import { createTableOfContents, processer } from 'microcms-richedit-processer';
import { iso2datetime } from '@/lib/time';
import { unified } from 'unified';
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
    const tableOfContents = createTableOfContents(post.content);
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
            {tableOfContents.length !== 0 && (
                <>
                    <span className="h4">目次</span>
                    <Stack gap={0}>
                        {tableOfContents.map(header => (
                            <div key={header.id}>
                                {header.text}
                            </div>
                        ))}
                    </Stack>
                </>
            )}
            <div className={pageStyles['contents']}>
                <>
                    {unified().use(rehypeParse, {
                        fragment: true
                        // @ts-ignore
                    }).use(rehypeReact, {
                        Fragment,
                        components: {
                            a: Link,
                            img: Image
                        },
                        createElement
                    }).processSync(await processer(post.content, {
                        code: {
                            enabled: true
                        },
                        iframe: {
                            enabled: true
                        },
                        img: {
                            enabled: true
                        }
                    })).result}
                </>
            </div>
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
