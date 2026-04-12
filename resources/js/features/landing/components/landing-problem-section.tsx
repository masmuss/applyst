import { CardContent } from '@/components/ui/card';
import { MagicBadge } from '@/components/ui/magic-badge';
import { MagicCard } from '@/components/ui/magic-card';
import { LandingReveal } from '@/features/landing/components/landing-reveal';
import { processSteps, problemCards } from '@/features/landing/landing-data';

export function LandingProblemSection() {
    return (
        <section className="bg-black/20 py-16">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mt-14 text-center">
                    <MagicBadge title="The Process" className="mb-5" />
                    <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Effortless application management in 3 steps
                    </h3>
                    <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-400 sm:text-base">
                        A familiar structure from modern landing pages, adapted
                        to Applyst for job seekers.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                    {processSteps.map((step, index) => (
                        <LandingReveal
                            key={step.title}
                            delay={180 + index * 100}
                        >
                            <MagicCard className="h-full">
                                <CardContent className="p-0">
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                                            <step.icon className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <h4 className="mb-2 text-sm font-semibold text-white">
                                        {step.title}
                                    </h4>
                                    <p className="text-sm leading-relaxed text-neutral-400">
                                        {step.desc}
                                    </p>
                                </CardContent>
                            </MagicCard>
                        </LandingReveal>
                    ))}
                </div>

                <h3 className="mt-16 mb-6 text-center text-lg font-medium tracking-widest text-neutral-300 uppercase">
                    Ever experienced this?
                </h3>

                <div className="grid gap-6 sm:grid-cols-3">
                    {problemCards.map((item, index) => (
                        <LandingReveal
                            key={item.title}
                            delay={300 + index * 80}
                        >
                            <MagicCard className="h-full bg-black/35">
                                <CardContent className="p-0">
                                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/8">
                                        <item.icon className="h-4 w-4 text-neutral-300" />
                                    </div>
                                    <h3 className="mb-1.5 font-semibold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-neutral-400">
                                        {item.desc}
                                    </p>
                                </CardContent>
                            </MagicCard>
                        </LandingReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
