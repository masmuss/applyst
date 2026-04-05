import { router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

type PrimitiveFilterValue = string | number | boolean | null | undefined;
type FilterValue = PrimitiveFilterValue | PrimitiveFilterValue[];

const EMPTY_TOKEN = 'all';

interface UseTableFiltersOptions<T extends Record<string, FilterValue>> {
    routeName?: string;
    routePath?: string;
    filters: T;
    only?: string[];
    debounceMs?: number;
    preserveState?: boolean;
    preserveScroll?: boolean;
    replace?: boolean;
    searchKey?: keyof T & string;
    resetPageKey?: keyof T & string;
    retainedOnResetKeys?: Array<keyof T & string>;
    resolveRouteName?: (name: string) => string;
}

type MaybeWindowWithRoute = Window & {
    route?: (name: string) => string;
};

/**
 * Encapsulates server-driven table filters with optional debounced search.
 *
 * Supports both Ziggy named routes (`routeName`) and direct paths/Wayfinder URLs (`routePath`).
 * Prefer `routePath` when using Wayfinder-generated routes.
 */
export function useTableFilters<T extends Record<string, FilterValue>>({
    routeName,
    routePath,
    filters,
    only = [],
    debounceMs = 500,
    preserveState = true,
    preserveScroll = true,
    replace = true,
    searchKey = 'search' as keyof T & string,
    resetPageKey = 'page' as keyof T & string,
    retainedOnResetKeys = [],
    resolveRouteName,
}: UseTableFiltersOptions<T>) {
    const [search, setSearch] = useState(String(filters[searchKey] ?? ''));
    const [debouncedSearch] = useDebounce(search, debounceMs);

    const getTargetPath = useCallback((): string => {
        if (routePath) {
            return routePath;
        }

        if (routeName) {
            if (resolveRouteName) {
                return resolveRouteName(routeName);
            }

            const routeResolver = (window as MaybeWindowWithRoute).route;

            if (typeof routeResolver === 'function') {
                return routeResolver(routeName);
            }

            return window.location.pathname;
        }

        return window.location.pathname;
    }, [resolveRouteName, routeName, routePath]);

    const sanitizeFilters = useCallback(
        (candidateFilters: Partial<T>): Partial<T> => {
            const sanitized: Partial<T> = {};

            for (const [rawKey, rawValue] of Object.entries(candidateFilters)) {
                const key = rawKey as keyof T;

                if (
                    rawValue === null ||
                    rawValue === undefined ||
                    rawValue === '' ||
                    rawValue === EMPTY_TOKEN
                ) {
                    continue;
                }

                sanitized[key] = rawValue as T[keyof T];
            }

            return sanitized;
        },
        [],
    );

    const visit = useCallback(
        (nextFilters: Partial<T>) => {
            router.get(getTargetPath(), nextFilters, {
                preserveState,
                preserveScroll,
                replace,
                only: only.length > 0 ? only : undefined,
            });
        },
        [getTargetPath, only, preserveScroll, preserveState, replace],
    );

    const applyFilters = useCallback(
        (
            updates: Partial<T>,
            options?: {
                resetPage?: boolean;
            },
        ) => {
            const merged = { ...filters, ...updates } as Partial<T>;

            if (options?.resetPage !== false) {
                merged[resetPageKey as keyof T] = undefined;
            }

            visit(sanitizeFilters(merged));
        },
        [filters, resetPageKey, sanitizeFilters, visit],
    );

    const handleFilterChange = useCallback(
        (key: keyof T, value: FilterValue) => {
            applyFilters({ [key]: value } as Partial<T>);
        },
        [applyFilters],
    );

    const currentSearchFromFilters = String(filters[searchKey] ?? '');

    useEffect(() => {
        const targetSearch = debouncedSearch.trim();

        if (targetSearch !== currentSearchFromFilters) {
            handleFilterChange(searchKey as keyof T, targetSearch || null);
        }
    }, [
        debouncedSearch,
        currentSearchFromFilters,
        handleFilterChange,
        searchKey,
    ]);

    const clearFilters = useCallback(() => {
        setSearch('');

        const retainedFilters = retainedOnResetKeys.reduce<Partial<T>>(
            (carry, key) => {
                carry[key as keyof T] = filters[key as keyof T];

                return carry;
            },
            {},
        );

        visit(sanitizeFilters(retainedFilters));
    }, [filters, retainedOnResetKeys, sanitizeFilters, visit]);

    const hasFilters = Object.entries(filters).some(([rawKey, rawValue]) => {
        if (retainedOnResetKeys.includes(rawKey as keyof T & string)) {
            return false;
        }

        return (
            rawValue !== null &&
            rawValue !== undefined &&
            rawValue !== '' &&
            rawValue !== EMPTY_TOKEN
        );
    });

    return {
        search,
        setSearch,
        handleFilterChange,
        applyFilters,
        applySearch: (value?: string) => {
            const target = (value ?? search).trim();
            handleFilterChange(searchKey as keyof T, target || null);
        },
        clearFilters,
        hasFilters,
    };
}
