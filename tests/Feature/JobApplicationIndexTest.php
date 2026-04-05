<?php

namespace Tests\Feature;

use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class JobApplicationIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_job_application_index_renders_the_pipeline_view(): void
    {
        /** @var User $user */
        $user = User::factory()->create();
        /** @var User $otherUser */
        $otherUser = User::factory()->create();

        JobApplication::factory()
            ->for($user)
            ->create([
                'company_name' => 'Acme Studio',
                'position' => 'Product Designer',
                'status' => 'applied',
                'source' => 'LinkedIn',
                'applied_at' => '2026-04-01',
            ]);

        JobApplication::factory()
            ->for($user)
            ->create([
                'company_name' => 'Northwind',
                'position' => 'Frontend Engineer',
                'status' => 'interview',
                'source' => 'Referral',
                'applied_at' => '2026-04-02',
            ]);

        JobApplication::factory()
            ->for($otherUser)
            ->create([
                'company_name' => 'Hidden Corp',
                'position' => 'Full Stack Engineer',
                'status' => 'rejected',
                'source' => 'Company Website',
                'applied_at' => '2026-04-03',
            ]);

        $this->actingAs($user)
            ->get(route('job-applications.index', ['status' => 'applied']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('job-applications/index')
                ->where('filters.status', 'applied')
                ->where('summary.total', 1)
                ->where('summary.statuses.process', 1)
                ->where('summary.statuses.accepted', 0)
                ->where('summary.statuses.rejected', 0)
                ->where('statuses.applied', 'Applied')
                ->has('applications.data', 1),
            );
    }
}
