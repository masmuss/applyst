import { BriefcaseIcon } from 'lucide-react';

export function LandingBrand() {
    return (
        <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <BriefcaseIcon className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
                Applyst
            </span>
        </div>
    );
}
