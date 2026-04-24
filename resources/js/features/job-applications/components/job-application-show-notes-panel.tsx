import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

type JobApplicationShowNotesPanelProps = {
    notes: string;
    appliedAtLabel: string;
    createdAtLabel: string;
    updatedAtLabel: string;
};

export function JobApplicationShowNotesPanel({
    notes,
    appliedAtLabel,
    createdAtLabel,
    updatedAtLabel,
}: JobApplicationShowNotesPanelProps) {
    return (
        <Card className="border-border/60 bg-card/90 lg:sticky lg:top-6">
            <CardHeader className="pb-4">
                <CardTitle>Application notes</CardTitle>
                <CardDescription>
                    Personal context and reminders for this role.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <Textarea
                    value={notes}
                    readOnly
                    className="min-h-44 resize-none border-border/70 bg-muted/35 text-sm leading-relaxed"
                />

                <Separator />

                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4 text-muted-foreground">
                        <span>Applied on</span>
                        <span className="font-medium text-foreground">
                            {appliedAtLabel}
                        </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-muted-foreground">
                        <span>Created at</span>
                        <span className="font-medium text-foreground">
                            {createdAtLabel}
                        </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-muted-foreground">
                        <span>Last updated</span>
                        <span className="font-medium text-foreground">
                            {updatedAtLabel}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
