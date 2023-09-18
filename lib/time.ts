'use strict';

export function iso2datetime(iso: string): string {
    const date: Date = new Date(iso);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString(10).padStart(2, '0')}/${date.getDate().toString(10).padStart(2, '0')} ${date.getHours().toString(10).padStart(2, '0')}:${date.getMinutes().toString(10).padStart(2, '0')}`;
}
