import AppLogo from '@/components/layout/app-logo';

export function LandingFooter() {
    return (
        <footer className="border-t border-white/10 py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 sm:flex-row">
                <AppLogo className="h-10 w-10 bg-transparent" />
                <p className="text-xs text-slate-500">
                    © {new Date().getFullYear()} Applyst. Built for job seekers.
                </p>
            </div>
        </footer>
    );
}
