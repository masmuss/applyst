import { Head } from '@inertiajs/react';
import { JobApplicationShowHero } from '@/features/job-applications/components/job-application-show-hero';
import { JobApplicationShowNotesPanel } from '@/features/job-applications/components/job-application-show-notes-panel';
import { JobApplicationShowTimeline } from '@/features/job-applications/components/job-application-show-timeline';
import type {
    JobApplicationDetail,
    JobApplicationStatusLabels,
    JobApplicationStatusLog,
} from '@/features/job-applications/types';
import {
    formatDate,
    formatShortDate,
    getProcessDurationLabel,
} from '@/features/job-applications/utils';
import { dashboard } from '@/routes';
import jobApplications from '@/routes/job-applications';

type Props = {
    jobApplication: JobApplicationDetail;
    statusLogs: JobApplicationStatusLog[];
    statuses: JobApplicationStatusLabels;
};

export default function JobApplicationsShow({
    jobApplication,
    statusLogs,
    statuses,
}: Props) {
    const currentStatusLabel = statuses[jobApplication.status];
    const notes =
        jobApplication.notes?.trim() ||
        'No notes yet for this application. Add your interview observations, follow-up ideas, or role-fit thoughts here.';
    const processDuration = getProcessDurationLabel(
        statusLogs,
        jobApplication.applied_at,
    );

    return (
        <>
            <Head title={`${jobApplication.company_name} - Job application`} />

            <div className="relative min-h-full overflow-hidden p-4 lg:p-8">
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(65%_45%_at_18%_0%,hsl(var(--primary)/0.18),transparent),radial-gradient(50%_35%_at_85%_10%,hsl(var(--secondary)/0.12),transparent)]" />

                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
                    <JobApplicationShowHero
                        jobApplication={jobApplication}
                        statusLabel={currentStatusLabel}
                        appliedLabel={formatShortDate(
                            jobApplication.applied_at,
                        )}
                        sourceLabel={
                            jobApplication.source ?? 'Direct application'
                        }
                        backHref={jobApplications.index().url}
                    />

                    <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start">
                        <JobApplicationShowNotesPanel
                            notes={notes}
                            appliedAtLabel={formatShortDate(
                                jobApplication.applied_at,
                            )}
                            createdAtLabel={formatDate(
                                jobApplication.created_at,
                            )}
                            updatedAtLabel={formatDate(
                                jobApplication.updated_at,
                            )}
                        />

                        <div className="space-y-6">
                            <JobApplicationShowTimeline
                                statusLogs={statusLogs}
                                processDurationLabel={processDuration}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

JobApplicationsShow.layout = (props: Props) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Job applications',
            href: jobApplications.index(),
        },
        {
            title: props.jobApplication.company_name,
            href: jobApplications.show(props.jobApplication.id),
        },
    ],
});
