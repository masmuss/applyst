<?php

namespace Tests\Unit;

use App\Enums\JobApplicationStatus;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobApplicationObserverTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_an_initial_status_log_when_a_job_application_is_created(): void
    {
        $user = User::factory()->create();

        $jobApplication = JobApplication::factory()
            ->for($user)
            ->create([
                'status' => JobApplicationStatus::Applied->value,
            ]);

        $this->assertDatabaseCount('application_status_logs', 1);
        $this->assertDatabaseHas('application_status_logs', [
            'job_application_id' => $jobApplication->id,
            'from_status' => null,
            'to_status' => JobApplicationStatus::Applied->value,
            'notes' => 'Initial status set to Applied',
        ]);
    }

    public function test_it_only_creates_a_status_log_when_the_status_changes(): void
    {
        $user = User::factory()->create();

        $jobApplication = JobApplication::factory()
            ->for($user)
            ->create([
                'status' => JobApplicationStatus::Applied->value,
            ]);

        $jobApplication->update([
            'source' => 'Indeed',
        ]);

        $this->assertDatabaseCount('application_status_logs', 1);

        $jobApplication->update([
            'status' => JobApplicationStatus::Interview->value,
        ]);

        $this->assertDatabaseCount('application_status_logs', 2);
        $this->assertDatabaseHas('application_status_logs', [
            'job_application_id' => $jobApplication->id,
            'from_status' => JobApplicationStatus::Applied->value,
            'to_status' => JobApplicationStatus::Interview->value,
            'notes' => 'Status changed from Applied to Interview',
        ]);
    }
}
