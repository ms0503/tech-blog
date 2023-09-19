'use strict';

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        description: 'STM32系・Web系の技術ブログ',
        display: 'browser',
        icons: [
            {
                sizes: 'any',
                src: '/favicon.ico',
                type: 'image/vnd.microsoft.icon'
            },
            {
                sizes: '192x192',
                src: '/icon-192.png',
                type: 'image/png'
            },
            {
                sizes: '512x512',
                src: '/icon-512.png',
                type: 'image/png'
            }
        ],
        name: 'ms0503 Tech Blog',
        short_name: 'Tech Blog',
        start_url: '/'
    };
}
