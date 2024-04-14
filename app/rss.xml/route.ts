'use strict';

import { generateRssXml } from '@/lib/feed';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    const xml: string = await generateRssXml();
    return new NextResponse(xml, {
        headers: {
            'cache-control': 's-maxage=86400, stale-while-revalidate',
            'content-type': 'application/rss+xml; charset=UTF-8'
        },
        status: 200
    });
}
