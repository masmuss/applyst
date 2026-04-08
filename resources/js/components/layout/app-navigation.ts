import { BriefcaseBusiness, LayoutGrid } from 'lucide-react';
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
