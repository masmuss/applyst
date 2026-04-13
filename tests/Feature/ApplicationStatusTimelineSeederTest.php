<?php

namespace Tests\Feature;

use App\Enums\JobApplicationStatus;
use App\Models\JobApplication;
use Database\Seeders\ApplicationStatusLogSeeder;
use Database\Seeders\JobApplicationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApplicationStatusTimelineSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_seeded_timeline_progression_matches_each_application_status(): void
    {
        $this->seed([
            JobApplicationSeeder::class,
            ApplicationStatusLogSeeder::class,
        ]);

        $applications = JobApplication::query()
            ->with(['statusLogs' => fn ($query) => $query->oldest('created_at')])
            ->get();

        $this->assertGreaterThan(0, $applications->count());

        foreach ($applications as $application) {
            $logs = $application->statusLogs;

            $this->assertGreaterThan(0, $logs->count());
            $this->assertNull($logs->first()?->from_status);
            $this->assertSame(JobApplicationStatus::Applied->value, $logs->first()?->to_status);
            $this->assertSame($application->status, $logs->last()?->to_status);

            $previousChangedAt = null;

            foreach ($logs as $log) {
                $this->assertNotNull($log->changed_at);

                if ($previousChangedAt !== null) {
                    $this->assertTrue(
                        $log->changed_at->greaterThanOrEqualTo($previousChangedAt),
                        'Timeline logs must be in chronological order.',
                    );
                }

                $previousChangedAt = $log->changed_at;
            }
        }

        $acceptedApplication = $applications->firstWhere('status', JobApplicationStatus::Accepted->value);
        $rejectedApplication = $applications->firstWhere('status', JobApplicationStatus::Rejected->value);

        $this->assertNotNull($acceptedApplication);
        $this->assertNotNull($rejectedApplication);

        $acceptedStatuses = $acceptedApplication->statusLogs
            ->pluck('to_status')
            ->values()
            ->all();

        $this->assertSame([
            JobApplicationStatus::Applied->value,
            JobApplicationStatus::Interview->value,
            JobApplicationStatus::Offering->value,
            JobApplicationStatus::Accepted->value,
        ], $acceptedStatuses);

        $rejectedStatuses = $rejectedApplication->statusLogs
            ->pluck('to_status')
            ->values()
            ->all();

        $this->assertSame([
            JobApplicationStatus::Applied->value,
            JobApplicationStatus::Interview->value,
            JobApplicationStatus::Rejected->value,
        ], $rejectedStatuses);
    }
}
