import { browserStats } from '@/features/landing/landing-data';

export function LandingBrowserPreviewStats() {
    return (
        <div className="mb-5 grid grid-cols-4 gap-3">
            {browserStats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-lg border border-white/10 bg-white/5 p-3 text-left"
                >
                    <div className="text-xs text-slate-400">{stat.label}</div>
                    <div className="mt-1 text-2xl font-bold text-slate-100">
                        {stat.value}
                    </div>
                    <div className="text-xs text-slate-400">{stat.sub}</div>
                </div>
            ))}
        </div>
    );
}
