import { Badge } from '@/components/ui/badge';
import { statusConfig } from '@/features/landing/landing-data';
import type { LandingStatus } from '@/features/landing/landing-data';
import { cn } from '@/lib/utils';

export function LandingStatusBadge({ status }: { status: LandingStatus }) {
    const config = statusConfig[status];

    return (
        <Badge
            variant="outline"
            className={cn('px-2 py-0.5 text-xs font-medium', config.className)}
        >
            {config.label}
        </Badge>
    );
}
