'use strict';

import { generateFeedJson } from '@/lib/feed';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    const json: string = await generateFeedJson();
    return new NextResponse(json, {
        headers: {
            'cache-control': 's-maxage=86400, stale-while-revalidate',
            'content-type': 'application/feed+json; charset=UTF-8'
        },
        status: 200
    });
}
