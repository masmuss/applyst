import { Card, CardContent } from '@/components/ui/card';
import { problemCards } from '@/features/landing/landing-data';

export function LandingProblemSection() {
    return (
        <section className="border-y border-border/40 bg-muted/20 py-16">
            <div className="mx-auto max-w-6xl px-6">
                <p className="mb-10 text-center text-sm font-medium tracking-widest text-muted-foreground/60 uppercase">
                    Pernah ngalamin ini?
                </p>
                <div className="grid gap-6 sm:grid-cols-3">
                    {problemCards.map((item) => (
                        <Card
                            key={item.title}
                            className="border-border/50 bg-card/50"
                        >
                            <CardContent className="p-5">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <h3 className="mb-1.5 text-sm font-semibold">
                                    {item.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {item.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
