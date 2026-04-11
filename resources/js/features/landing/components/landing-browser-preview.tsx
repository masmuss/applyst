import { JobApplicationStatusBadge } from '@/features/job-applications/components/job-application-status';
import {
    browserStats,
    mockApplications,
} from '@/features/landing/landing-data';
import { cn, toTitleCase } from '@/lib/utils';

export function LandingBrowserPreview() {
    const trafficLights: string[] = [
        'bg-rose-500/60',
        'bg-amber-500/60',
        'bg-emerald-500/60',
    ];

    return (
        <div className="relative mx-auto mt-14 hidden max-w-4xl md:block">
            <div className="overflow-hidden rounded-xl border border-white/15 bg-[#0e1119] shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/30 px-4 py-3">
                    {trafficLights.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                'h-2.5 w-2.5 rounded-full',
                                trafficLights[index],
                            )}
                        />
                    ))}
                    <div className="ml-3 flex h-5 max-w-full flex-1 items-center rounded-md bg-white/5 p-4 text-xs text-slate-400/80">
                        app.applyst.id
                    </div>
                </div>

                <div className="p-6">
                    <div className="mb-5 grid grid-cols-4 gap-3">
                        {browserStats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-lg border border-white/10 bg-white/5 p-3 text-left"
                            >
                                <div className="text-xs text-slate-400">
                                    {stat.label}
                                </div>
                                <div className="mt-1 text-2xl font-bold text-slate-100">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {stat.sub}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="overflow-hidden rounded-lg border border-white/10">
                        <table className="w-full border-separate border-spacing-0 text-sm">
                            <thead className="bg-white/5 text-xs font-medium text-slate-400">
                                <tr>
                                    <th className="px-4 py-2.5 text-left font-medium">
                                        Company
                                    </th>
                                    <th className="px-4 py-2.5 text-left font-medium">
                                        Role
                                    </th>
                                    <th className="px-4 py-2.5 text-left font-medium">
                                        Status
                                    </th>
                                    <th className="px-4 py-2.5 text-left font-medium">
                                        Applied
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockApplications.map((application, index) => (
                                    <tr
                                        key={application.company}
                                        className="align-middle"
                                    >
                                        <td
                                            className={cn(
                                                'px-4 py-3 text-left',
                                                index <
                                                    mockApplications.length -
                                                        1 &&
                                                    'border-b border-white/10',
                                            )}
                                        >
                                            <div className="font-medium text-slate-100">
                                                {application.company}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {application.source}
                                            </div>
                                        </td>
                                        <td
                                            className={cn(
                                                'px-4 py-3 text-slate-300',
                                                index <
                                                    mockApplications.length -
                                                        1 &&
                                                    'border-b border-white/10',
                                            )}
                                        >
                                            {application.position}
                                        </td>
                                        <td
                                            className={cn(
                                                'px-4 py-3',
                                                index <
                                                    mockApplications.length -
                                                        1 &&
                                                    'border-b border-white/10',
                                            )}
                                        >
                                            <JobApplicationStatusBadge
                                                status={application.status}
                                                label={toTitleCase(
                                                    application.status,
                                                )}
                                            />
                                        </td>
                                        <td
                                            className={cn(
                                                'px-4 py-3 text-xs text-slate-500',
                                                index <
                                                    mockApplications.length -
                                                        1 &&
                                                    'border-b border-white/10',
                                            )}
                                        >
                                            {application.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-12 -bottom-14 h-28 rounded-full bg-primary/30 blur-3xl" />
        </div>
    );
}
