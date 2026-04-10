import { cn } from '@/lib/utils';

type MagicBadgeProps = {
    title: string;
    className?: string;
};

export function MagicBadge({ title, className }: MagicBadgeProps) {
    return (
        <div
            className={cn(
                'relative inline-flex h-8 select-none overflow-hidden rounded-full p-[1.5px]',
                className,
            )}
        >
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,oklch(0.61_0.25_268)_0%,oklch(0.89_0.06_290)_50%,oklch(0.61_0.25_268)_100%)]" />
            <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-[#06080e] px-4 py-1 text-sm font-medium text-white backdrop-blur-2xl">
                {title}
            </span>
        </div>
    );
}
