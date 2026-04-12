import { CircleHelp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export function DashboardStatCard({
    title,
    description,
    tooltip,
    value,
    supportingText,
}: {
    title: string;
    description: string;
    tooltip: string;
    value: string;
    supportingText: string;
}) {
    return (
        <Card className="bg-linear-to-br from-background via-background to-muted dark:to-muted/10">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardAction>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                className="rounded-full"
                            >
                                <span className="sr-only">More details</span>
                                <CircleHelp className="size-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs text-left">{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </CardAction>
            </CardHeader>
            <CardContent className="text-3xl font-semibold tracking-tight">
                {value}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
                {supportingText}
            </CardFooter>
        </Card>
    );
}
