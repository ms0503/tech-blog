'use strict';

import styles from '@/app/page.module.scss';
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
    return (
        <>
            <h1>ms0503 Tech Blog</h1>
            <div className={styles['contents']}>
                <p>私が日々の作業で使ってる色々な物のtipsとかを書いていくブログだよ。</p>
                <p>基本的に怪文書めいた文体なので苦手な方は容赦なくブラウザバックして、どうぞ。</p>
            </div>
        </>
    );
}
