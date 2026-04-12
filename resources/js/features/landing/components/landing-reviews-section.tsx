import { StarIcon } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { LandingReveal } from '@/features/landing/components/landing-reveal';
import { testimonials } from '@/features/landing/landing-data';

export function LandingReviewsSection() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-6xl px-6">
                <LandingReveal
                    className="mx-auto mb-10 max-w-2xl text-center"
                    delay={80}
                >
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        What users say about Applyst
                    </h2>
                    <p className="mt-3 text-neutral-400">
                        A testimonial block inspired by Linkify style, tuned to
                        Applyst&apos;s visual system.
                    </p>
                </LandingReveal>

                <div className="grid gap-5 md:grid-cols-3">
                    {testimonials.map((testimonial, row) => (
                        <LandingReveal
                            key={testimonial.name}
                            delay={150 + row * 90}
                        >
                            <Card className="h-full border-white/10 bg-white/5">
                                <CardHeader>
                                    <CardTitle className="text-base text-white">
                                        {testimonial.name}
                                    </CardTitle>
                                    <CardDescription className="text-neutral-400">
                                        {testimonial.role}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed text-neutral-400">
                                        {testimonial.review}
                                    </p>
                                </CardContent>
                                <CardFooter className="gap-1">
                                    {Array.from(
                                        { length: testimonial.rating },
                                        (_, index) => (
                                            <StarIcon
                                                key={index}
                                                className="h-4 w-4 fill-primary text-primary"
                                            />
                                        ),
                                    )}
                                </CardFooter>
                            </Card>
                        </LandingReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
