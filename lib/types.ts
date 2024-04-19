'use strict';

export type PropsWithParams<T extends Record<string, string>, U = {}> = U & {
    params: T
};
