import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandingBrowserPreview } from '@/features/landing/components/landing-browser-preview';
import { login, register } from '@/routes';

type Props = {
    canRegister?: boolean;
};

export function LandingHero({ canRegister = true }: Props) {
    return (
        <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
                </span>
                Gratis untuk semua orang
            </div>

            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Sudah apply ke mana saja?{' '}
                <span className="text-muted-foreground/50">
                    Kamu pasti lupa.
                </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
                Applyst membantu kamu mencatat, memantau, dan menganalisis semua
                lamaran kerja dalam satu tempat — bukan spreadsheet berantakan.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="gap-2" asChild>
                    <Link href={register()}>
                        Mulai gratis sekarang
                        <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </Button>
                {canRegister && (
                    <Button size="lg" variant="outline" asChild>
                        <Link href={login()}>Sudah punya akun</Link>
                    </Button>
                )}
            </div>

            <LandingBrowserPreview />
        </section>
    );
}
