import { Form } from '@inertiajs/react';
import { toast } from 'sonner';
import AlertError from '@/components/shared/alert-error';
import { Button } from '@/components/ui/button';
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
import type { JobApplicationStatusLabels } from '@/features/job-applications/types';
import jobApplications from '@/routes/job-applications';

type Props = {
    statuses: JobApplicationStatusLabels;
    onSuccess: () => void;
    onCancel: () => void;
};

function todayAsInputValue(): string {
    const today = new Date();

    return [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0'),
    ].join('-');
}

export function JobApplicationCreateForm({
    statuses,
    onSuccess,
    onCancel,
}: Props) {
    return (
        <Form
            {...jobApplications.store.form()}
            options={{ preserveScroll: true }}
            resetOnSuccess
            onSuccess={() => {
                toast.success('Job application created.');
                onSuccess();
            }}
            onError={() => {
                toast.error('Please check the form fields and try again.');
            }}
            className="space-y-5"
        >
            {({ processing, errors, resetAndClearErrors }) => {
                const errorMessages = Object.values(errors).filter(Boolean);

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
                                    <FieldLabel htmlFor="company_name">
                                        Company name
                                    </FieldLabel>
                                    <Input
                                        id="company_name"
                                        name="company_name"
                                        placeholder="Nusantara Tech"
                                        autoComplete="organization"
                                        required
                                        aria-invalid={Boolean(
                                            errors.company_name,
                                        )}
                                    />
                                    <FieldError>
                                        {errors.company_name}
                                    </FieldError>
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldContent>
                                    <FieldLabel htmlFor="position">
                                        Position
                                    </FieldLabel>
                                    <Input
                                        id="position"
                                        name="position"
                                        placeholder="Frontend Engineer"
                                        autoComplete="off"
                                        required
                                        aria-invalid={Boolean(errors.position)}
                                    />
                                    <FieldError>{errors.position}</FieldError>
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldContent>
                                    <FieldLabel htmlFor="status">
                                        Status
                                    </FieldLabel>
                                    <Select
                                        name="status"
                                        defaultValue="applied"
                                        required
                                        aria-invalid={Boolean(errors.status)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <JobApplicationStatusSelectOptions
                                                statuses={statuses}
                                            />
                                        </SelectContent>
                                    </Select>
                                    <FieldError>{errors.status}</FieldError>
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldContent>
                                    <FieldLabel htmlFor="applied_at">
                                        Applied at
                                    </FieldLabel>
                                    <Input
                                        id="applied_at"
                                        name="applied_at"
                                        type="date"
                                        defaultValue={todayAsInputValue()}
                                        aria-invalid={Boolean(
                                            errors.applied_at,
                                        )}
                                    />
                                    <FieldError>{errors.applied_at}</FieldError>
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldContent>
                                    <FieldLabel htmlFor="source">
                                        Source
                                    </FieldLabel>
                                    <Input
                                        id="source"
                                        name="source"
                                        placeholder="LinkedIn, referral, company site"
                                        aria-invalid={Boolean(errors.source)}
                                    />
                                    <FieldError>{errors.source}</FieldError>
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldContent>
                                    <FieldLabel htmlFor="job_url">
                                        Job URL
                                    </FieldLabel>
                                    <Input
                                        id="job_url"
                                        name="job_url"
                                        placeholder="https://..."
                                        type="url"
                                        aria-invalid={Boolean(errors.job_url)}
                                    />
                                    <FieldError>{errors.job_url}</FieldError>
                                </FieldContent>
                            </Field>

                            <Field className="md:col-span-2">
                                <FieldContent>
                                    <FieldLabel htmlFor="notes">
                                        Notes
                                    </FieldLabel>
                                    <Textarea
                                        id="notes"
                                        name="notes"
                                        placeholder="Follow-up date, contact name, interview notes, and so on."
                                        className="min-h-28"
                                    />
                                    <FieldError>{errors.notes}</FieldError>
                                </FieldContent>
                            </Field>
                        </FieldGroup>

                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    resetAndClearErrors();
                                    onCancel();
                                }}
                                disabled={processing}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={processing}>
                                Save application
                            </Button>
                        </div>
                    </>
                );
            }}
        </Form>
    );
}
