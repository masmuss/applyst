import { HugeiconsIcon } from '@hugeicons/react';

interface IconProps {
    iconNode?: HugeiconsIcon | null;
    className?: string;
}

export function Icon({ iconNode: IconComponent, className }: IconProps) {
    if (!IconComponent) {
        return null;
    }

    return <IconComponent className={className} />;
}
