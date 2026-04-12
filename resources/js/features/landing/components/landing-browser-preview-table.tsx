import { JobApplicationStatusBadge } from '@/features/job-applications/components/job-application-status';
import { mockApplications } from '@/features/landing/landing-data';
import { cn, toTitleCase } from '@/lib/utils';

export function LandingBrowserPreviewTable() {
    return (
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
                        <LandingBrowserPreviewTableRow
                            key={application.company}
                            application={application}
                            isLast={index === mockApplications.length - 1}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function LandingBrowserPreviewTableRow({
    application,
    isLast,
}: {
    application: (typeof mockApplications)[number];
    isLast: boolean;
}) {
    const rowBorderClass = !isLast ? 'border-b border-white/10' : undefined;

    return (
        <tr className="align-middle">
            <td className={cn('px-4 py-3 text-left', rowBorderClass)}>
                <div className="font-medium text-slate-100">
                    {application.company}
                </div>
                <div className="text-xs text-slate-400">
                    {application.source}
                </div>
            </td>
            <td className={cn('px-4 py-3 text-slate-300', rowBorderClass)}>
                {application.position}
            </td>
            <td className={cn('px-4 py-3', rowBorderClass)}>
                <JobApplicationStatusBadge
                    status={application.status}
                    label={toTitleCase(application.status)}
                />
            </td>
            <td
                className={cn(
                    'px-4 py-3 text-xs text-slate-400',
                    rowBorderClass,
                )}
            >
                {application.date}
            </td>
        </tr>
    );
}
