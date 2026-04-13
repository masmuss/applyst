import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LandingBrowserPreview } from '@/features/landing/components/landing-browser-preview';
import { LandingReveal } from '@/features/landing/components/landing-reveal';
import { login } from '@/routes';

export function LandingHero() {
    return (
        <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 text-center md:pt-24 lg:pt-28">
            <div className="landing-image-glow pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-48 w-full max-w-3xl rounded-full bg-primary/35 blur-[130px]" />

            <LandingReveal>
                <Badge
                    variant="outline"
                    className="mb-5 rounded-full border-primary/40 bg-white/5 p-3 text-neutral-200"
                >
                    <span className="relative mr-2 flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/90 opacity-75"></span>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary"></span>
                    </span>
                    Manage applications smarter
                    <HugeiconsIcon
                        icon={ArrowRight02Icon}
                        className="ml-1 h-3.5 w-3.5"
                    />
                </Badge>
            </LandingReveal>

            <LandingReveal delay={120}>
                <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    Smart Job Search
                    <span className="block bg-linear-to-r from-primary via-primary/80 to-fuchsia-400 bg-clip-text text-transparent">
                        with Precision
                    </span>
                </h1>
            </LandingReveal>

            <LandingReveal delay={220}>
                <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-300/90 sm:text-lg">
                    Effortlessly track every role, monitor progress, and keep
                    your application flow organized in one focused workspace.
                </p>
            </LandingReveal>

            <LandingReveal delay={300}>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button size="lg" asChild>
                        <Link href={login()}>
                            Start tracking for free
                            <HugeiconsIcon
                                icon={ArrowRight02Icon}
                                className="h-4 w-4"
                            />
                        </Link>
                    </Button>
                </div>
            </LandingReveal>

            <LandingReveal delay={400}>
                <LandingBrowserPreview />
            </LandingReveal>
        </section>
    );
}
