<?php

namespace Tests\Feature;

use App\Enums\JobApplicationStatus;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobApplicationStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_a_job_application(): void
    {
        /** @var User $user */
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('job-applications.store'), [
            'company_name' => 'Nusantara Tech',
            'position' => 'Frontend Engineer',
            'status' => JobApplicationStatus::Applied->value,
            'source' => 'LinkedIn',
            'applied_at' => '2026-04-06',
            'job_url' => 'https://careers.nusantaratech.id/jobs/frontend-engineer',
            'notes' => 'Initial application submitted.',
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('job_applications', [
            'user_id' => $user->id,
            'company_name' => 'Nusantara Tech',
            'position' => 'Frontend Engineer',
            'status' => JobApplicationStatus::Applied->value,
        ]);

        $this->assertDatabaseHas('application_status_logs', [
            'job_application_id' => JobApplication::query()->where('user_id', $user->id)->value('id'),
            'from_status' => null,
            'to_status' => JobApplicationStatus::Applied->value,
        ]);
    }
}
