'use strict';

import Link from 'next/link';
import rehypeParse from 'rehype-parse';
import rehypeReact, { Options } from 'rehype-react';
import styles from './BlogBody.module.scss'
import { Fragment, JSX, createElement } from 'react';
import { Image } from '@/app/components';
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
                    <Stack gap={0}>
                        {tableOfContents.map(header => (
                            <div key={header.id}>
                                {header.text}
                            </div>
                        ))}
                    </Stack>
                </>
            )}
            <div className={styles['contents']}>
                <>
                    {unified().use(rehypeParse, {
                        fragment: true
                    }).use(rehypeReact, {
                        Fragment,
                        components: {
                            a: Link,
                            img: Image
                        },
                        createElement
                    } as Options).processSync(await processer(body, {
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
