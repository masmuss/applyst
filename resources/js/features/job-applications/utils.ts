import type { JobApplicationStatusLog } from '@/features/job-applications/types';

export function formatDate(value: string | null): string {
    if (!value) {
        return '-';
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(value));
}

export function formatShortDate(value: string): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));
}

export function getProcessDurationLabel(
    statusLogs: JobApplicationStatusLog[],
    appliedAt: string,
): string | null {
    const appliedAtDate = new Date(appliedAt);

    if (Number.isNaN(appliedAtDate.getTime()) || statusLogs.length === 0) {
        return null;
    }

    const latestChangeDate = statusLogs.reduce<Date>((latestDate, log) => {
        const eventDate = new Date(
            log.changed_at ?? log.created_at ?? appliedAt,
        );

        if (Number.isNaN(eventDate.getTime())) {
            return latestDate;
        }

        return eventDate > latestDate ? eventDate : latestDate;
    }, appliedAtDate);

    const diffInDays = Math.max(
        0,
        Math.round(
            (latestChangeDate.getTime() - appliedAtDate.getTime()) /
                (1000 * 60 * 60 * 24),
        ),
    );

    if (diffInDays === 0) {
        return 'Same day process';
    }

    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} process`;
}
