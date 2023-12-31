'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/globals.scss';
import Script from 'next/script';
import { Col, Container, Row } from '@/lib/client-react-bootstrap';
import { Footer, Header } from '@/app/components';
// eslint-disable-next-line camelcase
import { Noto_Sans_JP, Noto_Sans_Mono } from 'next/font/google';
import type { JSX, ReactNode } from 'react';
import type { Metadata } from 'next';

const NotoSansJP = Noto_Sans_JP({
    display: 'swap',
    subsets: [
        'latin'
    ],
    variable: '--noto-sans-jp',
    weight: 'variable'
});

const NotoSansMono = Noto_Sans_Mono({
    display: 'swap',
    subsets: [
        'latin'
    ],
    variable: '--noto-sans-mono',
    weight: 'variable'
});

export const metadata: Metadata = {
    authors: {
        name: 'Sora Tonami',
        url: process.env['BASE_URL']
    },
    creator: 'Sora Tonami',
    description: 'STM32系・Web系の技術ブログ',
    formatDetection: {
        address: false,
        date: false,
        email: false,
        telephone: false,
        url: false
    },
    generator: 'Next.js',
    metadataBase: new URL(process.env['BASE_URL']!),
    openGraph: {
        description: 'STM32系・Web系の技術ブログ',
        siteName: 'ms0503 Tech Blog',
        title: '',
        type: 'article'
    },
    publisher: 'Sora Tonami',
    themeColor: [
        {
            color: '#1a1a1a',
            media: '(prefers-color-scheme: dark)'
        },
        {
            color: '#e6e6e6',
            media: '(prefers-color-scheme: light)'
        }
    ],
    title: {
        absolute: 'ms0503 Tech Blog',
        template: '%s - ms0503 Tech Blog'
    },
    twitter: {
        card: 'summary',
        site: '@ms0503_'
    },
    viewport: {
        initialScale: 1,
        viewportFit: 'cover',
        width: 'device-width'
    }
};

type Props = {
    children: ReactNode
};

export default function RootLayout({ children }: Props): JSX.Element {
    return (
        <html lang="ja" prefix="og: https://ogp.me/ns#" className={`${NotoSansJP.variable} ${NotoSansMono.variable}`} data-bs-theme="light">
            <body>
                <Container fluid className="page-container">
                    <Row><Col><Header /></Col></Row>
                    <Row className="page-main"><Col><main>{children}</main></Col></Row>
                    <Row><Col><Footer /></Col></Row>
                </Container>
                <Script async id="bs-auto-theme" strategy="afterInteractive" dangerouslySetInnerHTML={{
                    __html: `
                        const html = document.documentElement;
                        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        if(isDarkMode) html.setAttribute('data-bs-theme', 'dark');
                    `
                }} />
            </body>
        </html>
    );
}
