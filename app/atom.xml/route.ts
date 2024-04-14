'use strict';

import { generateAtomXml } from '@/lib/feed';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    const xml: string = await generateAtomXml();
    return new NextResponse(xml, {
        headers: {
            'cache-control': 's-maxage=86400, stale-while-revalidate',
            'content-type': 'application/atom+xml; charset=UTF-8'
        },
        status: 200
    });
}
