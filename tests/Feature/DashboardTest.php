<?php

namespace Tests\Feature;

use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_dashboard(): void
    {
        Carbon::setTestNow(Carbon::parse('2026-04-08 12:00:00'));

        try {
            /** @var User $user */
            $user = User::factory()->create();
            /** @var User $otherUser */
            $otherUser = User::factory()->create();

            JobApplication::factory()->for($user)->create([
                'company_name' => 'Atlas Tech',
                'position' => 'Frontend Engineer',
                'status' => 'applied',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-01',
            ]);

            $respondedApplication = JobApplication::factory()->for($user)->create([
                'company_name' => 'Binari Labs',
                'position' => 'Software Engineer',
                'status' => 'applied',
                'source' => 'Company Website',
                'applied_at' => '2026-03-02',
            ]);
            $respondedApplication->update(['status' => 'interview']);

            $rejectedApplication = JobApplication::factory()->for($user)->create([
                'company_name' => 'Cermat AI',
                'position' => 'Product Engineer',
                'status' => 'applied',
                'source' => 'Referral',
                'applied_at' => '2026-03-03',
            ]);
            $rejectedApplication->update(['status' => 'rejected']);

            JobApplication::factory()->for($user)->create([
                'company_name' => 'Daya Studio',
                'position' => 'Backend Engineer',
                'status' => 'interview',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-04',
            ]);

            JobApplication::factory()->for($user)->create([
                'company_name' => 'Elara Systems',
                'position' => 'Platform Engineer',
                'status' => 'offering',
                'source' => 'Company Website',
                'applied_at' => '2026-03-05',
            ]);

            JobApplication::factory()->for($user)->create([
                'company_name' => 'Fajar Cloud',
                'position' => 'Engineering Lead',
                'status' => 'accepted',
                'source' => 'Referral',
                'applied_at' => '2026-03-06',
            ]);

            JobApplication::factory()->for($user)->create([
                'company_name' => 'Gala Works',
                'position' => 'QA Engineer',
                'status' => 'rejected',
                'source' => 'Indeed',
                'applied_at' => '2026-03-07',
            ]);

            JobApplication::factory()->for($user)->create([
                'company_name' => 'Horizon Apps',
                'position' => 'Mobile Engineer',
                'status' => 'applied',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-08',
            ]);

            JobApplication::factory()->for($otherUser)->create([
                'company_name' => 'Hidden Corp',
                'position' => 'Full Stack Engineer',
                'status' => 'accepted',
                'source' => 'Company Website',
                'applied_at' => '2026-03-09',
            ]);

            $this->actingAs($user)
                ->get(route('dashboard'))
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page
                    ->component('dashboard')
                    ->where('stats.responseRate.value', 75)
                    ->where('stats.responseRate.matchingApplications', 6)
                    ->where('stats.responseRate.totalApplications', 8)
                    ->where('stats.conversionRate.value', 50)
                    ->where('stats.conversionRate.matchingApplications', 4)
                    ->where('stats.conversionRate.totalApplications', 8)
                    ->where('stats.oldestActive.days', 38)
                    ->where('stats.oldestActive.company_name', 'Atlas Tech')
                    ->where('stats.oldestActive.activeApplications', 2)
                    ->where('recentApplications.0.company_name', 'Horizon Apps')
                    ->where('recentApplications.1.company_name', 'Gala Works')
                    ->where('recentApplications.2.company_name', 'Fajar Cloud')
                    ->where('recentApplications.3.company_name', 'Elara Systems')
                    ->where('recentApplications.4.company_name', 'Daya Studio')
                    ->has('recentApplications', 5)
                    ->where('statuses.applied', JobApplication::statuses()['applied'])
                );
        } finally {
            Carbon::setTestNow();
        }
    }

    public function test_dashboard_shows_empty_state_when_there_are_no_applications(): void
    {
        /** @var User $user */
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('dashboard')
                ->where('stats.responseRate.value', 0)
                ->where('stats.responseRate.matchingApplications', 0)
                ->where('stats.responseRate.totalApplications', 0)
                ->where('stats.conversionRate.value', 0)
                ->where('stats.conversionRate.matchingApplications', 0)
                ->where('stats.conversionRate.totalApplications', 0)
                ->where('stats.oldestActive.days', null)
                ->where('stats.oldestActive.company_name', null)
                ->where('stats.oldestActive.activeApplications', 0)
                ->has('recentApplications', 0)
            );
    }
}
