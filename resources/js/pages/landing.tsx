import { Head } from '@inertiajs/react';
import { LandingCtaSection } from '@/features/landing/components/landing-cta-section';
import { LandingFeaturesSection } from '@/features/landing/components/landing-features-section';
import { LandingFooter } from '@/features/landing/components/landing-footer';
import { LandingHeader } from '@/features/landing/components/landing-header';
import { LandingHero } from '@/features/landing/components/landing-hero';
import { LandingProblemSection } from '@/features/landing/components/landing-problem-section';

export default function Landing({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="relative min-h-screen overflow-hidden bg-[#06080e] text-slate-100 antialiased">
                <div className="landing-grid-bg pointer-events-none absolute inset-x-0 top-0 z-0 h-80 md:h-112" />
                <div className="landing-fade-overlay pointer-events-none absolute inset-x-0 top-0 z-0 h-96 md:h-120" />
                <div className="pointer-events-none absolute inset-x-0 -top-64 z-0 mx-auto h-120 w-xl rounded-full bg-primary/25 blur-[130px]" />

                <LandingHeader canRegister={canRegister} />
                <main className="relative z-10 pt-16">
                    <LandingHero />
                    <LandingProblemSection />
                    <LandingFeaturesSection />
                    <LandingCtaSection />
                </main>
                <LandingFooter />
            </div>
        </>
    );
}
