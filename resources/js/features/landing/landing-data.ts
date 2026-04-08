import {
    BarChart3Icon,
    BellIcon,
    BriefcaseIcon,
    CalendarClockIcon,
    CheckCircleIcon,
    LayoutDashboardIcon,
    SearchXIcon,
    TrendingUpIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const statusConfig = {
    applied: {
        label: 'Applied',
        className: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    interview: {
        label: 'Interview',
        className: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    },
    offering: {
        label: 'Offering',
        className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    accepted: {
        label: 'Accepted',
        className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    rejected: {
        label: 'Rejected',
        className: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    },
} as const;

export type LandingStatus = keyof typeof statusConfig;

export const mockApplications = [
    {
        company: 'Tiket.com',
        position: 'Backend Developer',
        source: 'LinkedIn',
        status: 'interview',
        date: '03 Apr 2026',
    },
    {
        company: 'Tokopedia',
        position: 'Software Engineer',
        source: 'Referral',
        status: 'applied',
        date: '01 Apr 2026',
    },
    {
        company: 'Gojek',
        position: 'Frontend Engineer',
        source: 'Company Website',
        status: 'offering',
        date: '28 Mar 2026',
    },
    {
        company: 'Traveloka',
        position: 'Full Stack Engineer',
        source: 'Jobstreet',
        status: 'accepted',
        date: '25 Mar 2026',
    },
    {
        company: 'Bukalapak',
        position: 'QA Engineer',
        source: 'LinkedIn',
        status: 'rejected',
        date: '20 Mar 2026',
    },
] as const satisfies Array<{
    company: string;
    position: string;
    source: string;
    status: LandingStatus;
    date: string;
}>;

export const browserStats = [
    {
        label: 'Total',
        value: '16',
        sub: 'applications',
    },
    {
        label: 'In progress',
        value: '12',
        sub: 'active',
    },
    {
        label: 'Accepted',
        value: '3',
        sub: 'offer',
    },
    {
        label: 'Rejected',
        value: '1',
        sub: 'closed',
    },
] as const;

export const problemCards = [
    {
        icon: SearchXIcon,
        title: 'You forget where you applied',
        desc: 'You open emails one by one, scroll chats, and search LinkedIn just to check if you already applied to the same company.',
    },
    {
        icon: CalendarClockIcon,
        title: 'You do not know when to follow up',
        desc: 'It has been a week with no update. Should you follow up now, or is it already too late?',
    },
    {
        icon: BarChart3Icon,
        title: 'You cannot measure what works',
        desc: 'From 20 applications, how many moved to interviews and offers? Without data, you cannot improve your strategy.',
    },
] as const satisfies Array<{
    icon: LucideIcon;
    title: string;
    desc: string;
}>;

export const featureCards = [
    {
        icon: LayoutDashboardIcon,
        title: 'Clear pipeline',
        desc: 'See all applications in one table. Filter by status, source, or search a company name instantly.',
        accent: 'text-blue-400',
        bg: 'bg-blue-500/10',
    },
    {
        icon: TrendingUpIcon,
        title: 'Track response rate',
        desc: 'Know the percentage of applications that get replies. Simple data that keeps your job search focused.',
        accent: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
    },
    {
        icon: CheckCircleIcon,
        title: 'Structured status flow',
        desc: 'Applied → Interview → Offering → Accepted or Rejected. Every status update is recorded automatically.',
        accent: 'text-violet-400',
        bg: 'bg-violet-500/10',
    },
    {
        icon: BellIcon,
        title: 'Reminder follow-up',
        desc: 'Set reminders for follow-up. No more forgotten applications because you missed the right timing.',
        accent: 'text-amber-400',
        bg: 'bg-amber-500/10',
    },
    {
        icon: BriefcaseIcon,
        title: 'Track application sources',
        desc: 'From LinkedIn, Jobstreet, referrals, or company websites, see which channel works best for you.',
        accent: 'text-rose-400',
        bg: 'bg-rose-500/10',
    },
    {
        icon: BarChart3Icon,
        title: 'Dashboard insight',
        desc: 'All key numbers on one screen: active vs closed applications and how fast your process is moving.',
        accent: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
    },
] as const satisfies Array<{
    icon: LucideIcon;
    title: string;
    desc: string;
    accent: string;
    bg: string;
}>;
