import { BentoCard, BentoGrid, CARDS } from '@/components/ui/bento-grid';
import { MagicBadge } from '@/components/ui/magic-badge';
import { LandingReveal } from '@/features/landing/components/landing-reveal';

export function LandingFeaturesSection() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-6xl px-6">
                <LandingReveal className="mb-12 text-center" delay={80}>
                    <MagicBadge title="Features" className="mb-5" />
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        One place for every application
                    </h2>
                    <p className="mt-3 text-slate-400">
                        Built to stay simple, not another enterprise tool that
                        makes everything harder.
                    </p>
                </LandingReveal>

                <BentoGrid className="py-4">
                    {CARDS.map((feature) => (
                        <BentoCard key={feature.name} {...feature} />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
