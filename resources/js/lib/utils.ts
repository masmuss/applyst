import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function toTitleCase(value: string): string {
    return value
        .replace(/[_-]+/g, ' ')
        .trim()
        .split(/\s+/)
        .map((word) =>
            word.length > 0
                ? word[0].toUpperCase() + word.slice(1).toLowerCase()
                : '',
        )
        .join(' ');
}
