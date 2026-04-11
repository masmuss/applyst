import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandingReveal } from '@/features/landing/components/landing-reveal';
import { register } from '@/routes';

export function LandingCtaSection() {
    return (
        <section className="relative overflow-hidden border-t border-white/10 py-24">
            <div className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-48 w-104 rounded-full bg-primary/35 blur-[120px]" />
            <LandingReveal
                className="relative mx-auto max-w-2xl px-6 text-center"
                delay={120}
            >
                <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
                    Step into the future of job application tracking
                </h2>
                <p className="mt-4 text-slate-400">
                    Experience a focused workflow that keeps your applications,
                    follow-ups, and outcomes organized.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center sm:flex-row">
                    <Button
                        size="lg"
                        className="gap-2 bg-white text-slate-950 hover:bg-slate-100"
                        asChild
                    >
                        <Link href={register()}>
                            Get started for free
                            <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </LandingReveal>
        </section>
    );
}
