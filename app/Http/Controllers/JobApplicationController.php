<?php

namespace App\Http\Controllers;

use App\Enums\JobApplicationStatus;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Http\Requests\UpdateJobApplicationRequest;
use App\Models\ApplicationStatusLog;
use App\Models\JobApplication;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    protected array $allowedSorts = [
        'company_name',
        'position',
        'status',
        'applied_at',
        'created_at',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $applicationsQuery = $this->applicationsQuery($request);
        $applications = (clone $applicationsQuery)
            ->advancedTable($request, $this->allowedSorts, defaultSort: 'applied_at');

        return Inertia::render('job-applications/index', [
            'applications' => $applications,
            'statuses' => JobApplication::statuses(),
            'summary' => $this->buildSummary($applicationsQuery),
            'filters' => $request->only([
                'search',
                'status',
                'source',
                'sort_by',
                'sort_dir',
                'per_page',
            ]),
        ]);
    }

    protected function applicationsQuery(Request $request): Builder
    {
        return JobApplication::query()
            ->whereBelongsTo($request->user())
            ->filter($request);
    }

    protected function buildSummary(Builder $applicationsQuery): array
    {
        $statusCounts = (clone $applicationsQuery)
            ->selectRaw('status, count(*) as aggregate')
            ->groupBy('status')
            ->pluck('aggregate', 'status');

        $processCount = (int) ($statusCounts[JobApplicationStatus::Applied->value] ?? 0)
            + (int) ($statusCounts[JobApplicationStatus::Interview->value] ?? 0)
            + (int) ($statusCounts[JobApplicationStatus::Offering->value] ?? 0);

        return [
            'total' => (clone $applicationsQuery)->count(),
            'statuses' => [
                'process' => $processCount,
                'accepted' => (int) ($statusCounts[JobApplicationStatus::Accepted->value] ?? 0),
                'rejected' => (int) ($statusCounts[JobApplicationStatus::Rejected->value] ?? 0),
            ],
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobApplicationRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['applied_at'] ??= today();

        $request->user()->jobApplications()->create($data);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(JobApplication $jobApplication)
    {
        $this->authorize('view', $jobApplication);

        $jobApplication->load([
            'statusLogs' => fn ($q) => $q->orderBy('created_at', 'desc'),
        ]);

        return Inertia::render('job-applications/show', [
            'jobApplication' => [
                'id' => $jobApplication->id,
                'company_name' => $jobApplication->company_name,
                'position' => $jobApplication->position,
                'status' => $jobApplication->status,
                'source' => $jobApplication->source,
                'applied_at' => $jobApplication->applied_at?->toDateString(),
                'job_url' => $jobApplication->job_url,
                'notes' => $jobApplication->notes,
                'created_at' => $jobApplication->created_at?->toIso8601String(),
                'updated_at' => $jobApplication->updated_at?->toIso8601String(),
            ],
            'statusLogs' => $jobApplication->statusLogs
                ->map(fn (ApplicationStatusLog $log) => [
                    'id' => $log->id,
                    'from_status' => $log->from_status,
                    'from_label' => $log->from_label,
                    'to_status' => $log->to_status,
                    'to_label' => $log->to_label,
                    'notes' => $log->notes,
                    'changed_at' => $log->changed_at?->toIso8601String(),
                    'created_at' => $log->created_at?->toIso8601String(),
                ])
                ->values(),
            'statuses' => JobApplication::statuses(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobApplication $jobApplication)
    {
        $this->authorize('update', $jobApplication);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobApplicationRequest $request, JobApplication $jobApplication): RedirectResponse
    {
        $this->authorize('update', $jobApplication);

        $data = $request->validated();
        $jobApplication->update($data);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobApplication $jobApplication): RedirectResponse
    {
        $this->authorize('delete', $jobApplication);

        $jobApplication->delete();

        return back();
    }
}
