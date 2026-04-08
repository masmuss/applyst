<?php

namespace Tests\Feature;

use App\Enums\JobApplicationStatus;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobApplicationUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_update_job_application(): void
    {
        /** @var User $user */
        $user = User::factory()->create();

        $jobApplication = JobApplication::factory()
            ->for($user)
            ->create([
                'status' => JobApplicationStatus::Applied->value,
                'position' => 'Frontend Engineer',
            ]);

        $response = $this->actingAs($user)
            ->put(route('job-applications.update', $jobApplication), [
                'position' => 'Senior Frontend Engineer',
                'status' => JobApplicationStatus::Interview->value,
            ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('job_applications', [
            'id' => $jobApplication->id,
            'position' => 'Senior Frontend Engineer',
            'status' => JobApplicationStatus::Interview->value,
        ]);
    }

    public function test_non_owner_cannot_update_job_application(): void
    {
        /** @var User $owner */
        $owner = User::factory()->create();
        /** @var User $otherUser */
        $otherUser = User::factory()->create();

        $jobApplication = JobApplication::factory()
            ->for($owner)
            ->create([
                'status' => JobApplicationStatus::Applied->value,
                'position' => 'Frontend Engineer',
            ]);

        $this->actingAs($otherUser)
            ->put(route('job-applications.update', $jobApplication), [
                'position' => 'Senior Frontend Engineer',
            ])
            ->assertForbidden();

        $this->assertDatabaseHas('job_applications', [
            'id' => $jobApplication->id,
            'position' => 'Frontend Engineer',
        ]);
    }
}
