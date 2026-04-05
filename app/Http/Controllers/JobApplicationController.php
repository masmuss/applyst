<?php

namespace App\Http\Controllers;

use App\Enums\JobApplicationStatus;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Http\Requests\UpdateJobApplicationRequest;
use App\Models\JobApplication;
use Illuminate\Database\Eloquent\Builder;
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobApplicationRequest $request)
    {
        $data = $request->validated();
        $data['applied_at'] ??= today();

        $request->user()->jobApplications()->create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(JobApplication $jobApplication)
    {
        $this->authorize('view', $jobApplication);

        $jobApplication->load([
            'statusLogs' => fn ($q) => $q->oldest('created_at'),
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
    public function update(UpdateJobApplicationRequest $request, JobApplication $jobApplication)
    {
        $this->authorize('update', $jobApplication);

        $data = $request->validated();
        $jobApplication->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobApplication $jobApplication)
    {
        $this->authorize('delete', $jobApplication);
    }
}
