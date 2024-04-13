'use strict';

import Link from 'next/link';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import styles from './BlogBody.module.scss';
import { Fragment, JSX, createElement } from 'react';
import { Image } from '@/app/components/Image';
import { Stack } from '@/lib/client-react-bootstrap';
import { createTableOfContents, processer } from 'microcms-richedit-processer';
import { unified } from 'unified';

type Props = {
    body: string
}

export async function BlogBody({ body }: Props): Promise<JSX.Element> {
    const tableOfContents = createTableOfContents(body);
    return (
        <>
            {tableOfContents.length !== 0 && (
                <>
                    <span className="h4">目次</span>
                    <Stack className={styles['toc']} gap={0}>
                        {tableOfContents.map((header, i) => (
                            <div key={header.id}>
                                <Link href={`#${header.id}`}>
                                    {i + 1}. {header.text}
                                </Link>
                            </div>
                        ))}
                    </Stack>
                </>
            )}
            <div className={styles['contents']}>
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
                    }).processSync(await processer(body, {
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
