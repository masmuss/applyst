<?php

namespace Database\Factories;

use App\Models\JobApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobApplication>
 */
class JobApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_name' => fake()->company(),
            'position' => fake()->jobTitle(),
            'status' => fake()->randomElement(array_keys(JobApplication::STATUSES)),
            'source' => fake()->randomElement([
                'LinkedIn',
                'Company Website',
                'Referral',
                'Indeed',
            ]),
            'applied_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'job_url' => fake()->url(),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
