import { LandingBrand } from '@/features/landing/components/landing-brand';

export function LandingFooter() {
    return (
        <footer className="border-t border-border/40 py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
                <LandingBrand />
                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Applyst. Built for job seekers.
                </p>
            </div>
        </footer>
    );
}
