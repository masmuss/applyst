<?php

namespace Tests\Feature;

use App\Enums\JobApplicationStatus;
use App\Models\ApplicationStatusLog;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class JobApplicationShowTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_view_job_application_timeline_page(): void
    {
        /** @var User $user */
        $user = User::factory()->create();

        $jobApplication = JobApplication::factory()
            ->for($user)
            ->create([
                'status' => JobApplicationStatus::Interview->value,
                'company_name' => 'Acme Labs',
                'position' => 'Frontend Engineer',
            ]);

        ApplicationStatusLog::query()->create([
            'job_application_id' => $jobApplication->id,
            'from_status' => JobApplicationStatus::Applied->value,
            'to_status' => JobApplicationStatus::Interview->value,
            'notes' => 'First interview scheduled',
        ]);

        $this->actingAs($user)
            ->get(route('job-applications.show', $jobApplication))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('job-applications/show')
                ->where('jobApplication.id', $jobApplication->id)
                ->where('jobApplication.company_name', 'Acme Labs')
                ->where('jobApplication.status', JobApplicationStatus::Interview->value)
                ->where('statuses.interview', JobApplication::statuses()['interview'])
                ->has('statusLogs', 2)
                ->where('statusLogs.1.to_status', JobApplicationStatus::Interview->value)
                ->where('statusLogs.1.notes', 'First interview scheduled'),
            );
    }

    public function test_non_owner_cannot_view_job_application_detail_page(): void
    {
        /** @var User $owner */
        $owner = User::factory()->create();
        /** @var User $otherUser */
        $otherUser = User::factory()->create();

        $jobApplication = JobApplication::factory()
            ->for($owner)
            ->create();

        $this->actingAs($otherUser)
            ->get(route('job-applications.show', $jobApplication))
            ->assertForbidden();
    }
}
