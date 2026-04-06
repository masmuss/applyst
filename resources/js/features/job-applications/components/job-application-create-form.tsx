import { Form } from '@inertiajs/react';
import { toast } from 'sonner';
import AlertError from '@/components/shared/alert-error';
import { Button } from '@/components/ui/button';
import type { JobApplicationStatusLabels } from '@/features/job-applications/types';
import jobApplications from '@/routes/job-applications';
import { JobApplicationFormFields } from '@/features/job-applications/components/job-application-form-fields';

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

                        <JobApplicationFormFields
                            statuses={statuses}
                            errors={errors}
                            defaults={{
                                status: 'applied',
                                applied_at: todayAsInputValue(),
                            }}
                            requireCoreFields={true}
                        />

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
