import {
    BookOpen,
    BriefcaseBusiness,
    FolderGit2,
    LayoutGrid,
} from 'lucide-react';
import { dashboard } from '@/routes';
import jobApplications from '@/routes/job-applications';
import type { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Job applications',
        href: jobApplications.index(),
        icon: BriefcaseBusiness,
    },
];

export const utilityNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];
