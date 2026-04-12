import AppLogo from '@/components/layout/app-logo';

export function LandingFooter() {
    return (
        <footer className="border-t border-white/10 py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 sm:flex-row">
                <AppLogo variant="plain" className="h-10 w-10" />
                <p className="text-xs text-neutral-400">
                    © {new Date().getFullYear()} Applyst. Built for job seekers.
                </p>
            </div>
        </footer>
    );
}
