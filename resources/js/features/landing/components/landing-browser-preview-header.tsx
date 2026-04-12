import { cn } from '@/lib/utils';

const trafficLights: string[] = [
    'bg-rose-500/60',
    'bg-amber-500/60',
    'bg-emerald-500/60',
];

export function LandingBrowserPreviewHeader() {
    return (
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/30 px-4 py-3">
            {trafficLights.map((color, index) => (
                <div
                    key={index}
                    className={cn('h-2.5 w-2.5 rounded-full', color)}
                />
            ))}
            <div className="ml-3 flex h-5 max-w-full flex-1 items-center rounded-md bg-white/5 p-4 text-xs text-neutral-300">
                app.applyst.id
            </div>
        </div>
    );
}
