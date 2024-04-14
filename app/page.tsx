'use strict';

import styles from '@/app/page.module.scss';
import type { Metadata } from 'next';
import type { JSX } from 'react';

export const metadata: Metadata = {
    description: 'STM32系・Web系の技術ブログ',
    openGraph: {
        description: 'STM32系・Web系の技術ブログ',
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
                <p>
                    私が高専ロボコンで使った技術とか、Web開発とかに関する情報をまとめるような、そんなブログのような何かです。<br />
                    ロボコンならSTM32のLLだったりCMakeやGit、WebならNext.js辺りを使ってるので書いていけたらいいなぁ。
                </p>
            </div>
        </>
    );
}
