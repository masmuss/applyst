<?php

namespace Tests\Feature;

use App\Enums\JobApplicationStatus;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobApplicationDestroyTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_delete_job_application(): void
    {
        /** @var User $user */
        $user = User::factory()->create();

        $jobApplication = JobApplication::factory()
            ->for($user)
            ->create([
                'status' => JobApplicationStatus::Applied->value,
            ]);

        $response = $this->actingAs($user)
            ->delete(route('job-applications.destroy', $jobApplication));

        $response->assertRedirect();

        $this->assertSoftDeleted('job_applications', [
            'id' => $jobApplication->id,
        ]);
    }

    public function test_non_owner_cannot_delete_job_application(): void
    {
        /** @var User $owner */
        $owner = User::factory()->create();
        /** @var User $otherUser */
        $otherUser = User::factory()->create();

        $jobApplication = JobApplication::factory()
            ->for($owner)
            ->create([
                'status' => JobApplicationStatus::Applied->value,
            ]);

        $this->actingAs($otherUser)
            ->delete(route('job-applications.destroy', $jobApplication))
            ->assertForbidden();

        $this->assertDatabaseHas('job_applications', [
            'id' => $jobApplication->id,
            'deleted_at' => null,
        ]);
    }
}
