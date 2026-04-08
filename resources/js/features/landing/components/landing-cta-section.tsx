import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { login, register } from '@/routes';

type Props = {
    canRegister?: boolean;
};

export function LandingCtaSection({ canRegister = true }: Props) {
    return (
        <section className="border-t border-border/40 bg-muted/20 py-20">
            <div className="mx-auto max-w-xl px-6 text-center">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Start tracking your applications today
                </h2>
                <p className="mt-3 text-muted-foreground">
                    Free forever. No credit card required.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button size="lg" className="gap-2" asChild>
                        <Link href={register()}>
                            Create a free account
                            <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                    {canRegister && (
                        <Button size="lg" variant="outline" asChild>
                            <Link href={login()}>Already have an account</Link>
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}
