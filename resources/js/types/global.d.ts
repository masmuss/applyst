import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            seo: {
                title: string;
                fullTitle: string;
                description: string;
                url: string;
                type: 'website' | 'article';
                image: string;
                siteName: string;
                robots: string;
            };
            auth: Auth;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
