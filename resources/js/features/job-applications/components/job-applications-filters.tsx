import { router } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type {
    JobApplicationStatusLabels,
    JobApplicationsFilters,
} from '@/features/job-applications/types';
import jobApplications from '@/routes/job-applications';

type Props = {
    filters: JobApplicationsFilters;
    statuses: JobApplicationStatusLabels;
};

const ALL_STATUSES = '__all__';

export function JobApplicationsFilters({ filters, statuses }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? ALL_STATUSES);
    const [source, setSource] = useState(filters.source ?? '');

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        router.get(
            jobApplications.index.url(),
            {
                search: search.trim() || undefined,
                status: status === ALL_STATUSES ? undefined : status,
                source: source.trim() || undefined,
                sort_by: filters.sort_by || undefined,
                sort_dir: filters.sort_dir || undefined,
                per_page: filters.per_page || undefined,
                page: 1,
            },
            {
                preserveScroll: true,
                replace: true,
            },
        );
    }

    function handleReset(): void {
        setSearch('');
        setStatus(ALL_STATUSES);
        setSource('');

        router.get(
            jobApplications.index.url(),
            {
                sort_by: filters.sort_by || undefined,
                sort_dir: filters.sort_dir || undefined,
                per_page: filters.per_page || undefined,
                page: 1,
            },
            {
                preserveScroll: true,
                replace: true,
            },
        );
    }

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle>Refine your pipeline</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
                    onSubmit={handleSubmit}
                >
                    <div className="grid gap-2">
                        <Label htmlFor="job-application-search">Search</Label>
                        <Input
                            id="job-application-search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Company or role"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={ALL_STATUSES}>
                                    All statuses
                                </SelectItem>
                                {Object.entries(statuses).map(
                                    ([value, label]) => (
                                        <SelectItem key={value} value={value}>
                                            {label}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="job-application-source">Source</Label>
                        <Input
                            id="job-application-source"
                            value={source}
                            onChange={(event) => setSource(event.target.value)}
                            placeholder="LinkedIn, referral, company site"
                        />
                    </div>

                    <div className="flex items-end gap-2">
                        <Button type="submit" className="w-full md:w-auto">
                            Apply
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full md:w-auto"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
