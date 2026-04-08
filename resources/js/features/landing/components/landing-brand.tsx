import { BriefcaseIcon } from 'lucide-react';

export function LandingBrand() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <BriefcaseIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold tracking-tight">
                Applyst
            </span>
        </div>
    );
}
