import AppLogoIcon from '@/components/layout/app-logo-icon';
import { cn } from '@/lib/utils';

type Props = React.ComponentPropsWithoutRef<'div'> & {
    variant?: 'badge' | 'plain';
};

export default function AppLogo({ className, variant = 'badge' }: Props) {
    const iconContainerClassName =
        variant === 'plain'
            ? 'flex aspect-square size-10 items-center justify-center rounded-md text-foreground dark:text-white'
            : 'flex aspect-square size-10 items-center justify-center rounded-md bg-primary text-primary-foreground';

    return (
        <>
            <div className={cn(iconContainerClassName, className)}>
                <AppLogoIcon className="size-10 fill-current" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="truncate leading-tight font-semibold">
                    Applyst
                </span>
            </div>
        </>
    );
}
