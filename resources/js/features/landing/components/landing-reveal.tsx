import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

export function LandingReveal({ children, className, delay = 0 }: Props) {
    return (
        <div
            className={cn('landing-reveal', className)}
            style={{ '--landing-delay': `${delay}ms` } as CSSProperties}
        >
            {children}
        </div>
    );
}
