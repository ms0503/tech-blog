'use strict';

import { ImageConfigComplete, imageConfigDefault } from 'next/dist/shared/lib/image-config';
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime';
import NextImage, { ImageLoaderProps, ImageProps } from 'next/image';
import { DetailedHTMLProps, JSX, SourceHTMLAttributes, useContext, useMemo } from 'react';

type ArtDirective = {
    src: string,
    media: string,
    width?: number,
    height?: number
};

type Props = Omit<ImageProps, 'src' | 'width' | 'height' | 'blurDataURL' | 'loader' | 'alt'> & {
    src: string,
    width: number,
    height: number,
    alt: string,
    artDirectives?: ArtDirective[],
    preloadFormat?: 'image/avif' | 'image/webp',
    props?: unknown[]
};

type SourcesProps = {
    sources: DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>[],
    preloadLinks: {
        srcSet: string,
        type: string,
        media?: string
    }[]
} & Pick<ImageProps, 'sizes' | 'priority'>;

type GetSourcesArgs = {
    deviceSizes: number[],
    src: string,
    width?: number,
    height?: number,
    quality?: number,
    formats?: string[],
    artDirectives?: ArtDirective[],
    preloadFormat: 'image/avif' | 'image/webp'
};

type GetSourcesResult = {
    sources: DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>[],
    preloadLinks: {
        srcSet: string,
        type: string,
        media?: string
    }[]
};

const configEnv: ImageConfigComplete = process.env['__NEXT_IMAGE_OPTS'] as unknown as ImageConfigComplete;

export function Image({ alt, artDirectives, height, preloadFormat = 'image/webp', priority, quality, src, width, ...props }: Props) {
    const configContext: ImageConfigComplete = useImageConfig();
    const deviceSizes: number[] = useMemo(() => {
        const c: ImageConfigComplete = configEnv || configContext || imageConfigDefault;
        return c.deviceSizes.sort((a, b) => a - b);
    }, [configContext]);
    const sources: GetSourcesResult = getSources({
        artDirectives,
        deviceSizes,
        height,
        preloadFormat,
        quality: Number(quality),
        src,
        width
    });
    return (
        <picture>
            <Sources {...sources} sizes={props.sizes} priority={priority} />
            <NextImage {...props} {...{ alt, height, quality, src, width }} sizes={props.sizes ?? '100vw'} blurDataURL={props.placeholder === 'blur' ? loader({ quality: 10, src, width: 8 }) : undefined} loading={priority ? 'eager' : props.loading} />
        </picture>
    );
}

function Sources({ sources }: SourcesProps): JSX.Element {
    return (
        <>
            {sources.map(sourceProps => <source key={sourceProps.srcSet} {...sourceProps} />)}
        </>
    );
}

function normalizeSrc(src: string): string {
    return src[0] === '/' ? src.slice(1) : src;
}

function loader({ format, quality, src, width }: ImageLoaderProps & { format?: string }): string {
    const url: URL = new URL(normalizeSrc(src));
    const params: URLSearchParams = url.searchParams;
    params.set('fit', params.get('fit') || 'max');
    params.set('w', params.get('w') || width.toString());
    if(quality) {
        params.set('q', quality.toString());
    }
    if(format) {
        params.set('fm', format);
    }
    return url.href;
}

function getSources({ artDirectives, formats = ['image/avif', 'image/webp'], deviceSizes, height, preloadFormat, quality = 75, src, width }: GetSourcesArgs): GetSourcesResult {
    if(artDirectives) {
        if(!Array.isArray(artDirectives)) {
            throw Error('`artDirectives`には配列を指定してください。');
        }
        const artDirectivesSources = artDirectives.map(({ height, media, src, width }) => [
            ...formats.map(format => ({
                height,
                media,
                srcSet: getSrcSet(src, deviceSizes, quality, format),
                type: format,
                width
            })),
            {
                height,
                media,
                srcSet: getSrcSet(src, deviceSizes, quality),
                width
            }
        ]);
        const defaultSources = formats.map(format => ({
            height,
            srcSet: getSrcSet(src, deviceSizes, quality, format),
            type: format,
            width
        }));
        const artDirectivesPreloadLinks = artDirectives.map(({ media, src }) => ({
            media,
            srcSet: getSrcSet(src, deviceSizes, quality, getFormatParam(preloadFormat)),
            type: preloadFormat
        }));
        const defaultPreloadLink = {
            media: `not all and ${artDirectivesPreloadLinks.at(-1)?.media}`,
            srcSet: getSrcSet(src, deviceSizes, quality, getFormatParam(preloadFormat)),
            type: preloadFormat
        };
        return {
            preloadLinks: [...artDirectivesPreloadLinks, defaultPreloadLink],
            sources: [...artDirectivesSources, ...defaultSources].flat()
        };
    } else {
        return {
            preloadLinks: [
                {
                    srcSet: getSrcSet(src, deviceSizes, quality, getFormatParam(preloadFormat)),
                    type: preloadFormat
                }
            ],
            sources: formats.map(format => ({
                srcSet: getSrcSet(src, deviceSizes, quality, format),
                type: format
            }))
        };
    }
}

function getFormatParam(format: string): string {
    return format.replace(/^image\//u, '');
}

function getSrcSet(src: string, deviceSizes: number[], quality: number, format?: string): string {
    return deviceSizes.map(deviceSize => `${loader({
        format: format !== undefined ? getFormatParam(format) : undefined,
        quality,
        src,
        width: deviceSize
    })} ${deviceSize}w`).join(', ');
}

function useImageConfig(): ImageConfigComplete {
    return useContext(ImageConfigContext);
}
