import { featureCards } from '@/features/landing/landing-data';
import { cn } from '@/lib/utils';

export function LandingFeaturesSection() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        One place for every application
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        Built to stay simple, not another enterprise tool that
                        makes everything harder.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {featureCards.map((feature) => (
                        <div
                            key={feature.title}
                            className="group rounded-xl border border-border/50 bg-card/30 p-5 transition-colors hover:bg-card/60"
                        >
                            <div
                                className={cn(
                                    'mb-3 flex h-9 w-9 items-center justify-center rounded-lg',
                                    feature.bg,
                                )}
                            >
                                <feature.icon
                                    className={cn('h-4 w-4', feature.accent)}
                                />
                            </div>
                            <h3 className="mb-1.5 text-sm font-semibold">
                                {feature.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
