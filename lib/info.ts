'use strict';

import type { Author } from 'feed';

export const author: Author = {
    email: 'ms0503@outlook.com',
    link: 'https://ms0503-tech-blog.vercel.app',
    name: 'Sora Tonami'
};

export const description = 'JK(情報系高専生)の技術ブログ';

export function getCopyright() {
    const date = new Date();
    return `Copyright © 2023-${date.getFullYear()} Sora Tonami. All rights reserved.`;
}

export const siteName = 'ms0503 Tech Blog';
