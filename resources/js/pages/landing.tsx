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
            <Head title="Applyst">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-background text-foreground antialiased">
                <LandingHeader canRegister={canRegister} />
                <LandingHero canRegister={canRegister} />
                <LandingProblemSection />
                <LandingFeaturesSection />
                <LandingCtaSection canRegister={canRegister} />
                <LandingFooter />
            </div>
        </>
    );
}
