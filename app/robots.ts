'use strict';

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            allow: '*',
            userAgent: '*'
        },
        sitemap: `${process.env['BASE_URL']}/sitemap.xml`
    };
}
