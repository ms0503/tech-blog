'use strict';

import { createClient, MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk';

export const microCMSClient = createClient({
    apiKey: process.env['MICROCMS_API_KEY']!,
    retry: true,
    serviceDomain: process.env['MICROCMS_DOMAIN']!
});

export interface MicroCMSApiImage {
    default_image: MicroCMSImage;
    art_directive_image: {
        'fieldId': 'art_directive_image',
        'default_image': MicroCMSImage,
        'md_image'?: MicroCMSImage,
        'lg_image'?: MicroCMSImage,
        '2xl_image'?: MicroCMSImage
    };
}

export type Category = {
    name: string
} & MicroCMSListContent;

export type Tag = {
    name: string
} & MicroCMSListContent;

export type Blog = {
    title: string,
    description: string,
    content: string,
    eyecatch?: MicroCMSApiImage,
    category: Category,
    tags: Tag[]
} & MicroCMSListContent;
