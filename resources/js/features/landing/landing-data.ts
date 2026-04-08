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
        sub: 'lamaran',
    },
    {
        label: 'Proses',
        value: '12',
        sub: 'aktif',
    },
    {
        label: 'Diterima',
        value: '3',
        sub: 'offer',
    },
    {
        label: 'Ditolak',
        value: '1',
        sub: 'closed',
    },
] as const;

export const problemCards = [
    {
        icon: SearchXIcon,
        title: 'Lupa sudah apply ke mana',
        desc: 'Buka email satu-satu, scroll chat WA, cari di LinkedIn — hanya untuk tahu kamu sudah apply ke perusahaan yang sama.',
    },
    {
        icon: CalendarClockIcon,
        title: 'Tidak tahu kapan harus follow-up',
        desc: 'Sudah seminggu belum ada kabar. Apa perlu di-follow-up? Atau malah sudah lewat dari batas wajarnya?',
    },
    {
        icon: BarChart3Icon,
        title: 'Tidak tahu seberapa efektif',
        desc: 'Dari 20 lamaran, berapa yang masuk interview? Berapa yang dapat offering? Tanpa data, kamu tidak bisa perbaiki strateginya.',
    },
] as const satisfies Array<{
    icon: LucideIcon;
    title: string;
    desc: string;
}>;

export const featureCards = [
    {
        icon: LayoutDashboardIcon,
        title: 'Pipeline yang jelas',
        desc: 'Lihat semua lamaran dalam satu tabel. Filter berdasarkan status, sumber, atau cari nama perusahaan langsung.',
        accent: 'text-blue-400',
        bg: 'bg-blue-500/10',
    },
    {
        icon: TrendingUpIcon,
        title: 'Pantau response rate',
        desc: 'Tahu berapa persen lamaranmu yang dapat balasan. Data sederhana yang membuat job search lebih terarah.',
        accent: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
    },
    {
        icon: CheckCircleIcon,
        title: 'Status yang terstruktur',
        desc: 'Applied → Interview → Offering → Accepted atau Rejected. Setiap perubahan status tercatat otomatis.',
        accent: 'text-violet-400',
        bg: 'bg-violet-500/10',
    },
    {
        icon: BellIcon,
        title: 'Reminder follow-up',
        desc: 'Set pengingat untuk follow-up. Tidak ada lagi lamaran yang terlupakan karena tidak ada notifikasi.',
        accent: 'text-amber-400',
        bg: 'bg-amber-500/10',
    },
    {
        icon: BriefcaseIcon,
        title: 'Catat sumber lamaran',
        desc: 'Dari LinkedIn, Jobstreet, referral, atau website perusahaan — tahu channel mana yang paling efektif buatmu.',
        accent: 'text-rose-400',
        bg: 'bg-rose-500/10',
    },
    {
        icon: BarChart3Icon,
        title: 'Dashboard insight',
        desc: 'Semua angka penting dalam satu layar. Berapa aktif, berapa closed, dan seberapa cepat prosesnya berjalan.',
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
