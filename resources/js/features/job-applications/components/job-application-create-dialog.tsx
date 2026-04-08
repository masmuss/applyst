import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { JobApplicationCreateForm } from '@/features/job-applications/components/job-application-create-form';
import type { JobApplicationStatusLabels } from '@/features/job-applications/types';

type Props = {
    statuses: JobApplicationStatusLabels;
};

export function JobApplicationCreateDialog({ statuses }: Props) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full md:w-auto">
                    <Plus className="h-4 w-4" />
                    Add new application
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create job application</DialogTitle>
                    <DialogDescription className="max-w-lg">
                        Add the essentials first, then update notes, links, or
                        status changes as your application moves forward.
                    </DialogDescription>
                </DialogHeader>

                <JobApplicationCreateForm
                    statuses={statuses}
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
