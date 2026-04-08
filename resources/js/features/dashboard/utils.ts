export function formatPercent(value: number): string {
    return `${new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 1,
    }).format(value)}%`;
}

export function formatShortDate(value: string | null): string {
    if (!value) {
        return '-';
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));
}

export function formatDays(value: number): string {
    return `${value} day${value === 1 ? '' : 's'}`;
}
