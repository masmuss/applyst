import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { LandingBrand } from '@/features/landing/components/landing-brand';
import { dashboard, login, register } from '@/routes';

type Props = {
    canRegister?: boolean;
};

export function LandingHeader({ canRegister = true }: Props) {
    const { auth } = usePage().props as {
        auth: {
            user: {
                name: string;
            } | null;
        };
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#06080e]/30 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <LandingBrand />

                <div className="flex items-center gap-2">
                    {auth.user ? (
                        <Button asChild>
                            <Link href={dashboard()}>Dashboard</Link>
                        </Button>
                    ) : (
                        <>
                            <Button variant="ghost" asChild>
                                <Link href={login()}>Log in</Link>
                            </Button>
                            {canRegister && (
                                <Button asChild>
                                    <Link href={register()}>Get started</Link>
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
