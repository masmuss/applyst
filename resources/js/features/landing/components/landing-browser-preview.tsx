import { LandingBrowserPreviewHeader } from '@/features/landing/components/landing-browser-preview-header';
import { LandingBrowserPreviewStats } from '@/features/landing/components/landing-browser-preview-stats';
import { LandingBrowserPreviewTable } from '@/features/landing/components/landing-browser-preview-table';

export function LandingBrowserPreview() {
    return (
        <div className="relative mx-auto mt-14 hidden max-w-4xl md:block">
            <div className="overflow-hidden rounded-xl border border-white/15 bg-[#0e1119] shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <LandingBrowserPreviewHeader />

                <div className="p-6">
                    <LandingBrowserPreviewStats />
                    <LandingBrowserPreviewTable />
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-12 -bottom-14 h-28 rounded-full bg-primary/30 blur-3xl" />
        </div>
    );
}
