import { Form } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
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
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { JobApplicationStatusSelectOptions } from '@/features/job-applications/components/job-application-status';
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
                        <Pencil data-icon="inline-start" />
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

                                <FieldGroup className="grid gap-4 md:grid-cols-2">
                                    <Field>
                                        <FieldContent>
                                            <FieldLabel
                                                htmlFor={`company_name-${jobApplication.id}`}
                                            >
                                                Company name
                                            </FieldLabel>
                                            <Input
                                                id={`company_name-${jobApplication.id}`}
                                                name="company_name"
                                                defaultValue={
                                                    jobApplication.company_name
                                                }
                                                placeholder="Nusantara Tech"
                                                autoComplete="organization"
                                            />
                                            <FieldError>
                                                {errors.company_name}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>

                                    <Field>
                                        <FieldContent>
                                            <FieldLabel
                                                htmlFor={`position-${jobApplication.id}`}
                                            >
                                                Position
                                            </FieldLabel>
                                            <Input
                                                id={`position-${jobApplication.id}`}
                                                name="position"
                                                defaultValue={
                                                    jobApplication.position
                                                }
                                                placeholder="Frontend Engineer"
                                                autoComplete="off"
                                            />
                                            <FieldError>
                                                {errors.position}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>

                                    <Field>
                                        <FieldContent>
                                            <FieldLabel
                                                htmlFor={`status-${jobApplication.id}`}
                                            >
                                                Status
                                            </FieldLabel>
                                            <Select
                                                name="status"
                                                defaultValue={
                                                    jobApplication.status
                                                }
                                            >
                                                <SelectTrigger
                                                    id={`status-${jobApplication.id}`}
                                                    className="w-full"
                                                >
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <JobApplicationStatusSelectOptions
                                                        statuses={statuses}
                                                    />
                                                </SelectContent>
                                            </Select>
                                            <FieldError>
                                                {errors.status}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>

                                    <Field>
                                        <FieldContent>
                                            <FieldLabel
                                                htmlFor={`applied_at-${jobApplication.id}`}
                                            >
                                                Applied at
                                            </FieldLabel>
                                            <Input
                                                id={`applied_at-${jobApplication.id}`}
                                                name="applied_at"
                                                type="date"
                                                defaultValue={toDateInputValue(
                                                    jobApplication.applied_at,
                                                )}
                                            />
                                            <FieldError>
                                                {errors.applied_at}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>

                                    <Field>
                                        <FieldContent>
                                            <FieldLabel
                                                htmlFor={`source-${jobApplication.id}`}
                                            >
                                                Source
                                            </FieldLabel>
                                            <Input
                                                id={`source-${jobApplication.id}`}
                                                name="source"
                                                defaultValue={
                                                    jobApplication.source ?? ''
                                                }
                                                placeholder="LinkedIn, referral, company site"
                                            />
                                            <FieldError>
                                                {errors.source}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>

                                    <Field>
                                        <FieldContent>
                                            <FieldLabel
                                                htmlFor={`job_url-${jobApplication.id}`}
                                            >
                                                Job URL
                                            </FieldLabel>
                                            <Input
                                                id={`job_url-${jobApplication.id}`}
                                                name="job_url"
                                                defaultValue={
                                                    jobApplication.job_url ?? ''
                                                }
                                                placeholder="https://..."
                                            />
                                            <FieldError>
                                                {errors.job_url}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>

                                    <Field className="md:col-span-2">
                                        <FieldContent>
                                            <FieldLabel
                                                htmlFor={`notes-${jobApplication.id}`}
                                            >
                                                Notes
                                            </FieldLabel>
                                            <Textarea
                                                id={`notes-${jobApplication.id}`}
                                                name="notes"
                                                defaultValue={
                                                    jobApplication.notes ?? ''
                                                }
                                                placeholder="Follow-up date, contact name, interview notes, and so on."
                                                className="min-h-28"
                                            />
                                            <FieldError>
                                                {errors.notes}
                                            </FieldError>
                                        </FieldContent>
                                    </Field>
                                </FieldGroup>

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
