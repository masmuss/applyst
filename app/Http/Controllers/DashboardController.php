<?php

namespace App\Http\Controllers;

use App\Enums\JobApplicationStatus;
use App\Models\JobApplication;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $applicationsQuery = $this->applicationsQuery($request);

        $totalApplications = (clone $applicationsQuery)->count();
        $activeApplications = (clone $applicationsQuery)
            ->where('status', JobApplicationStatus::Applied->value)
            ->count();

        $responseRateApplications = $this->responseRateApplicationsCount($applicationsQuery);
        $conversionRateApplications = $this->conversionRateApplicationsCount($applicationsQuery);
        $oldestActiveApplication = $this->oldestActiveApplication($applicationsQuery);
        $recentApplications = $this->recentApplications($applicationsQuery);

        return Inertia::render('dashboard', [
            'stats' => [
                'responseRate' => [
                    'value' => $this->percentage($responseRateApplications, $totalApplications),
                    'matchingApplications' => $responseRateApplications,
                    'totalApplications' => $totalApplications,
                ],
                'conversionRate' => [
                    'value' => $this->percentage($conversionRateApplications, $totalApplications),
                    'matchingApplications' => $conversionRateApplications,
                    'totalApplications' => $totalApplications,
                ],
                'oldestActive' => [
                    'days' => $oldestActiveApplication?->applied_at?->startOfDay()->diffInDays(now()->startOfDay()),
                    'company_name' => $oldestActiveApplication?->company_name,
                    'position' => $oldestActiveApplication?->position,
                    'applied_at' => $oldestActiveApplication?->applied_at?->toDateString(),
                    'activeApplications' => $activeApplications,
                ],
            ],
            'recentApplications' => $recentApplications->map(static function (JobApplication $application): array {
                return [
                    'id' => $application->id,
                    'company_name' => $application->company_name,
                    'position' => $application->position,
                    'status' => $application->status,
                    'applied_at' => $application->applied_at?->toDateString(),
                ];
            })->values(),
            'statuses' => JobApplication::statuses(),
        ]);
    }

    protected function applicationsQuery(Request $request): Builder
    {
        return JobApplication::query()->whereBelongsTo($request->user());
    }

    protected function responseRateApplicationsCount(Builder $applicationsQuery): int
    {
        return (clone $applicationsQuery)
            ->where(function ($query): void {
                $query->where('status', '!=', JobApplicationStatus::Applied->value)
                    ->orWhereHas('statusLogs', function ($logQuery): void {
                        $logQuery->whereIn('to_status', [
                            JobApplicationStatus::Interview->value,
                            JobApplicationStatus::Offering->value,
                            JobApplicationStatus::Accepted->value,
                            JobApplicationStatus::Rejected->value,
                        ]);
                    });
            })
            ->count();
    }

    protected function conversionRateApplicationsCount(Builder $applicationsQuery): int
    {
        return (clone $applicationsQuery)
            ->whereHas('statusLogs', function ($logQuery): void {
                $logQuery->whereIn('to_status', [
                    JobApplicationStatus::Interview->value,
                    JobApplicationStatus::Offering->value,
                    JobApplicationStatus::Accepted->value,
                ]);
            })
            ->count();
    }

    protected function oldestActiveApplication(Builder $applicationsQuery): ?JobApplication
    {
        return (clone $applicationsQuery)
            ->where('status', JobApplicationStatus::Applied->value)
            ->orderBy('applied_at')
            ->orderBy('id')
            ->first([
                'id',
                'company_name',
                'position',
                'status',
                'applied_at',
            ]);
    }

    protected function recentApplications(Builder $applicationsQuery): Collection
    {
        return (clone $applicationsQuery)
            ->orderByDesc('applied_at')
            ->orderByDesc('id')
            ->limit(5)
            ->get([
                'id',
                'company_name',
                'position',
                'status',
                'applied_at',
            ]);
    }

    protected function percentage(int $numerator, int $denominator): float
    {
        if ($denominator === 0) {
            return 0.0;
        }

        return round(($numerator / $denominator) * 100, 1);
    }
}
