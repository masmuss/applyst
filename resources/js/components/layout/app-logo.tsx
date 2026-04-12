import AppLogoIcon from '@/components/layout/app-logo-icon';
import { cn } from '@/lib/utils';

type Props = React.ComponentPropsWithoutRef<'div'>;

export default function AppLogo(props: Props) {
    return (
        <>
            <div
                className={cn(
                    'flex aspect-square size-10 items-center justify-center rounded-md bg-primary text-primary-foreground',
                    props?.className,
                )}
            >
                <AppLogoIcon className="size-10 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="truncate leading-tight font-semibold">
                    Applyst
                </span>
            </div>
        </>
    );
}
