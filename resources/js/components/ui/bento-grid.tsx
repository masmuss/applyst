import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    ArrowRight02Icon,
    BellRing,
    ChartLine,
    Search,
    Workflow,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { IconSvgElement } from '@hugeicons/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Command } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CARDS = [
    {
        Icon: Workflow,
        name: 'Application Pipeline',
        description:
            'Track every stage from Applied to Offer in one clear hiring flow.',
        href: '#',
        cta: 'See pipeline',
        className: 'col-span-3 lg:col-span-1',
        background: (
            <Card className="absolute top-10 left-10 origin-top rounded-none rounded-tl-md border border-white/10 border-r-0 bg-black/40 transition-all duration-300 ease-out mask-[linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105">
                <CardHeader>
                    <CardTitle>Track application</CardTitle>
                    <CardDescription>
                        Update progress without messy manual spreadsheets.
                    </CardDescription>
                </CardHeader>
                <CardContent className="-mt-4 space-y-2">
                    <Label>Position title</Label>
                    <Input
                        type="text"
                        placeholder="Frontend Engineer"
                        className="w-full focus-visible:ring-0 focus-visible:ring-transparent"
                    />
                </CardContent>
            </Card>
        ),
    },
    {
        Icon: Search,
        name: 'Smart Search & Filter',
        description:
            'Find companies, roles, and sources instantly with smart filters.',
        href: '#',
        cta: 'Try search',
        className: 'col-span-3 lg:col-span-2',
        background: (
            <Command className="absolute top-10 right-10 w-[70%] translate-x-0 border border-white/10 bg-black/40 p-2 transition-all duration-300 ease-out mask-[linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
                <Input placeholder="Search company or role..." />
                <div className="mt-1 cursor-pointer">
                    <div className="rounded-md px-4 py-2 hover:bg-muted">
                        Tokopedia - Backend Developer
                    </div>
                    <div className="rounded-md px-4 py-2 hover:bg-muted">
                        Gojek - Product Analyst
                    </div>
                    <div className="rounded-md px-4 py-2 hover:bg-muted">
                        Traveloka - Frontend Engineer
                    </div>
                    <div className="rounded-md px-4 py-2 hover:bg-muted">
                        Source: LinkedIn
                    </div>
                </div>
            </Command>
        ),
    },
    {
        Icon: ChartLine,
        name: 'Progress Insights',
        description:
            'Understand response rates and top-performing channels at a glance.',
        href: '#',
        cta: 'View insights',
        className: 'col-span-3 lg:col-span-2 max-w-full overflow-hidden',
        background: (
            <div className="absolute inset-0 p-6 transition-all duration-300 ease-out mask-[linear-gradient(to_top,transparent_8%,#000_100%)] group-hover:scale-[1.02]">
                <div className="space-y-3">
                    <div className="h-2.5 w-full rounded-full bg-white/10">
                        <div className="h-2.5 w-[72%] rounded-full bg-primary" />
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/10">
                        <div className="h-2.5 w-[58%] rounded-full bg-sky-400" />
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white/10">
                        <div className="h-2.5 w-[41%] rounded-full bg-emerald-400" />
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-neutral-300">
                    <div className="rounded-md border border-white/10 bg-black/40 p-2">
                        Response 41%
                    </div>
                    <div className="rounded-md border border-white/10 bg-black/40 p-2">
                        Interview 19%
                    </div>
                    <div className="rounded-md border border-white/10 bg-black/40 p-2">
                        Offer 6%
                    </div>
                </div>

                <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-3">
                    <div className="mb-2 flex items-center justify-between text-[11px] text-neutral-400">
                        <span>Weekly Trend</span>
                        <span>+12%</span>
                    </div>
                    <div className="flex h-12 items-end gap-1">
                        <span className="w-2.5 rounded-sm bg-primary/45" style={{ height: '24%' }} />
                        <span className="w-2.5 rounded-sm bg-primary/45" style={{ height: '35%' }} />
                        <span className="w-2.5 rounded-sm bg-primary/45" style={{ height: '48%' }} />
                        <span className="w-2.5 rounded-sm bg-primary/45" style={{ height: '43%' }} />
                        <span className="w-2.5 rounded-sm bg-primary/55" style={{ height: '61%' }} />
                        <span className="w-2.5 rounded-sm bg-primary/55" style={{ height: '74%' }} />
                        <span className="w-2.5 rounded-sm bg-primary/70" style={{ height: '86%' }} />
                    </div>
                </div>
            </div>
        ),
    },
    {
        Icon: BellRing,
        name: 'Follow-up Reminder',
        description:
            'Schedule follow-ups so opportunities never go cold or get missed.',
        className: 'col-span-3 lg:col-span-1',
        href: '#',
        cta: 'Set reminder',
        background: (
            <Calendar
                mode="single"
                selected={new Date()}
                className="absolute top-10 right-0 origin-top rounded-md border border-white/10 bg-black/40 transition-all duration-300 ease-out mask-[linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
            />
        ),
    },
];

const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                'grid w-full auto-rows-[22rem] grid-cols-3 gap-4',
                className,
            )}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
}: {
    name: string;
    className: string;
    background: ReactNode;
    Icon: IconSvgElement;
    description: string;
    href: string;
    cta: string;
}) => (
    <div
        key={name}
        className={cn(
            'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border border-white/10',
            'bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
            className,
        )}
    >
        <div>{background}</div>
        <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
            <HugeiconsIcon
                icon={Icon}
                className="h-12 w-12 mb-3 opacity-80 origin-left transition-all duration-300 ease-in-out group-hover:scale-75"
            />
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="max-w-lg text-muted-foreground">{description}</p>
        </div>

        <div
            className={cn(
                'absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100',
            )}
        >
            <Link
                href={href}
                className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                    className:
                        'cursor-pointer border border-white/15 bg-white/5 text-white hover:bg-white/10',
                })}
            >
                {cta}
                <HugeiconsIcon icon={ArrowRight02Icon} className="ml-1 h-4 w-4" />
            </Link>
        </div>
        <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10" />
    </div>
);

export { BentoCard, BentoGrid };
