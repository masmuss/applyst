import { Trash2 } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { JobApplicationRecord } from '@/features/job-applications/types';
import jobApplications from '@/routes/job-applications';

type Props = {
    jobApplication: JobApplicationRecord;
    trigger?: ReactNode;
};

export function JobApplicationDeleteDialog({ jobApplication, trigger }: Props) {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    function handleDelete(): void {
        setIsDeleting(true);

        router.delete(jobApplications.destroy.url(jobApplication.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Job application deleted.');
            },
            onError: () => {
                toast.error('Failed to delete job application.');
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger ?? (
                    <Button variant="destructive" size="sm">
                        <HugeiconsIcon icon={Trash2} />
                        Delete
                    </Button>
                )}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete this job application?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. The application for{' '}
                        <span className="font-medium text-foreground">
                            {jobApplication.position}
                        </span>{' '}
                        at{' '}
                        <span className="font-medium text-foreground">
                            {jobApplication.company_name}
                        </span>{' '}
                        will be removed.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={handleDelete}
                    >
                        Confirm delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
