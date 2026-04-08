import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LandingBrowserPreview } from '@/features/landing/components/landing-browser-preview';
import { login, register } from '@/routes';

type Props = {
    canRegister?: boolean;
};

export function LandingHero({ canRegister = true }: Props) {
    return (
        <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 text-center">
            <Badge variant="outline" className="mb-4 gap-2 p-3">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
                </span>
                Free for everyone
            </Badge>

            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Where have you applied so far?{' '}
                <span className="text-muted-foreground/50">
                    You probably forgot.
                </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
                Applyst helps you track, monitor, and analyze all your job
                applications in one place, not in messy spreadsheets.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="gap-2" asChild>
                    <Link href={register()}>
                        Start free now
                        <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </Button>
                {canRegister && (
                    <Button size="lg" variant="outline" asChild>
                        <Link href={login()}>Already have an account</Link>
                    </Button>
                )}
            </div>

            <LandingBrowserPreview />
        </section>
    );
}
