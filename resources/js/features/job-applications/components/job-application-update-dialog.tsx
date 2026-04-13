import { Pencil } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Form } from '@inertiajs/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import AlertError from '@/components/shared/alert-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { JobApplicationFormFields } from '@/features/job-applications/components/job-application-form-fields';
import type {
    JobApplicationRecord,
    JobApplicationStatusLabels,
} from '@/features/job-applications/types';
import jobApplications from '@/routes/job-applications';

type Props = {
    jobApplication: JobApplicationRecord;
    statuses: JobApplicationStatusLabels;
    trigger?: ReactNode;
};

function toDateInputValue(value: string): string {
    return value.includes('T') ? value.split('T')[0] : value;
}

export function JobApplicationUpdateDialog({
    jobApplication,
    statuses,
    trigger,
}: Props) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button variant="outline" size="sm">
                        <HugeiconsIcon icon={Pencil} data-icon="inline-start" />
                        Edit
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Update job application</DialogTitle>
                    <DialogDescription>
                        Edit the details below and save to keep your pipeline up
                        to date.
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...jobApplications.update.form(jobApplication.id)}
                    options={{ preserveScroll: true }}
                    onSuccess={() => {
                        setOpen(false);
                        toast.success('Job application updated.');
                    }}
                    onError={() => {
                        toast.error(
                            'Please check the form fields and try again.',
                        );
                    }}
                    className="space-y-5"
                >
                    {({ processing, errors, resetAndClearErrors }) => {
                        const errorMessages =
                            Object.values(errors).filter(Boolean);

                        return (
                            <>
                                {errorMessages.length ? (
                                    <AlertError
                                        title="Please fix the errors below."
                                        errors={errorMessages}
                                    />
                                ) : null}

                                <JobApplicationFormFields
                                    statuses={statuses}
                                    errors={errors}
                                    defaults={{
                                        company_name:
                                            jobApplication.company_name,
                                        position: jobApplication.position,
                                        status: jobApplication.status,
                                        applied_at: toDateInputValue(
                                            jobApplication.applied_at,
                                        ),
                                        source: jobApplication.source,
                                        job_url: jobApplication.job_url,
                                        notes: jobApplication.notes,
                                    }}
                                    idSuffix={`-${jobApplication.id}`}
                                />

                                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            resetAndClearErrors();
                                            setOpen(false);
                                        }}
                                        disabled={processing}
                                    >
                                        Cancel
                                    </Button>

                                    <Button type="submit" disabled={processing}>
                                        Save changes
                                    </Button>
                                </div>
                            </>
                        );
                    }}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
