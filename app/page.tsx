'use strict';

import styles from '@/app/page.module.scss';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { JSX } from 'react';

export const metadata: Metadata = {
    openGraph: {
        title: 'Top',
        type: 'website'
    },
    title: 'Top'
};

export default function Home(): JSX.Element {
    const date = new Date();
    return (
        <>
            <h1>ms0503 Tech Blog</h1>
            <div className={styles['contents']}>
                <p>私が日々の作業で使ってる色々な物のtipsとかを書いていくブログだよ。</p>
                <p>基本的に怪文書めいた文体なので苦手な方は容赦なくブラウザバックして、どうぞ。</p>
                <p>あと記事自体は<Link href="/licenses/fdl">FDL 1.3</Link>、記事中のソースは<Link href="/licenses/mit">MITライセンス</Link>とするので煮るなり焼くなりお好きにどうぞ。</p>
            </div>
            <div className={styles['contents']}>
                Copyright (C)  2023-{date.getFullYear()}  Sora Tonami.
                Permission is granted to copy, distribute and/or modify this document
                under the terms of the GNU Free Documentation License, Version 1.3
                or any later version published by the Free Software Foundation;
                with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
                A copy of the license is included in the section entitled &quot;GNU
                Free Documentation License&quot;.
            </div>
        </>
    );
}
