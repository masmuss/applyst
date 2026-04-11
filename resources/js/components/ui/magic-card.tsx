import { type MouseEvent, type ReactNode, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type MagicCardProps = {
    children: ReactNode;
    className?: string;
};

export function MagicCard({ children, className }: MagicCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isFocused) {
            return;
        }

        const rect = cardRef.current.getBoundingClientRect();

        setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onFocus={() => {
                setIsFocused(true);
                setOpacity(1);
            }}
            onBlur={() => {
                setIsFocused(false);
                setOpacity(0);
            }}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={cn(
                'relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 md:p-6',
                className,
            )}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(480px circle at ${position.x}px ${position.y}px, rgba(126, 91, 239, 0.18), transparent 60%)`,
                }}
            />

            {children}
        </div>
    );
}
