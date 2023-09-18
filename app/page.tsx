'use strict';

import type { JSX } from 'react';
import type { Metadata } from 'next';

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
            <p>
                私が高専ロボコンで使った技術とか、Web開発とかに関する情報をまとめるような、そんなブログのような何かです。<br />
                ロボコンならSTM32のLLだったりCMakeやGit、WebならNext.js辺りを使ってるので書いていけたらいいなぁ。
            </p>
        </>
    );
}
