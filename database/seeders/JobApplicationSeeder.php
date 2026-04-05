<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Database\Seeder;

class JobApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')],
        );

        $applications = [
            [
                'company_name' => 'Nusantara Tech',
                'position' => 'Frontend Engineer',
                'status' => 'applied',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-01',
                'job_url' => 'https://careers.nusantaratech.id/jobs/frontend-engineer',
            ],
            [
                'company_name' => 'Gojek',
                'position' => 'Software Engineer',
                'status' => 'applied',
                'source' => 'Company Website',
                'applied_at' => '2026-03-02',
                'job_url' => 'https://careers.gojek.com/jobs/software-engineer',
            ],
            [
                'company_name' => 'Traveloka',
                'position' => 'Product Engineer',
                'status' => 'applied',
                'source' => 'Referral',
                'applied_at' => '2026-03-03',
                'job_url' => 'https://careers.traveloka.com/jobs/product-engineer',
            ],
            [
                'company_name' => 'Bukalapak',
                'position' => 'UI Engineer',
                'status' => 'applied',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-04',
                'job_url' => 'https://careers.bukalapak.com/jobs/ui-engineer',
            ],
            [
                'company_name' => 'Mekari',
                'position' => 'Frontend Developer',
                'status' => 'applied',
                'source' => 'Indeed',
                'applied_at' => '2026-03-05',
                'job_url' => 'https://career.mekari.com/jobs/frontend-developer',
            ],
            [
                'company_name' => 'Xendit',
                'position' => 'Backend Engineer',
                'status' => 'interview',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-06',
                'job_url' => 'https://www.xendit.co/careers/backend-engineer',
            ],
            [
                'company_name' => 'Ruangguru',
                'position' => 'Full Stack Engineer',
                'status' => 'interview',
                'source' => 'Company Website',
                'applied_at' => '2026-03-07',
                'job_url' => 'https://career.ruangguru.com/jobs/full-stack-engineer',
            ],
            [
                'company_name' => 'Kredivo',
                'position' => 'Software Engineer II',
                'status' => 'interview',
                'source' => 'Referral',
                'applied_at' => '2026-03-08',
                'job_url' => 'https://careers.kredivo.com/jobs/software-engineer-ii',
            ],
            [
                'company_name' => 'Blibli',
                'position' => 'Frontend Engineer',
                'status' => 'interview',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-09',
                'job_url' => 'https://careers.blibli.com/jobs/frontend-engineer',
            ],
            [
                'company_name' => 'Dana',
                'position' => 'Platform Engineer',
                'status' => 'offering',
                'source' => 'Company Website',
                'applied_at' => '2026-03-10',
                'job_url' => 'https://careers.dana.id/jobs/platform-engineer',
            ],
            [
                'company_name' => 'Ajaib',
                'position' => 'Mobile Engineer',
                'status' => 'offering',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-11',
                'job_url' => 'https://career.ajaib.co.id/jobs/mobile-engineer',
            ],
            [
                'company_name' => 'Sirclo',
                'position' => 'Frontend Engineer',
                'status' => 'accepted',
                'source' => 'Referral',
                'applied_at' => '2026-03-12',
                'job_url' => 'https://careers.sirclo.com/jobs/frontend-engineer',
            ],
            [
                'company_name' => 'Halodoc',
                'position' => 'Software Engineer',
                'status' => 'accepted',
                'source' => 'Company Website',
                'applied_at' => '2026-03-13',
                'job_url' => 'https://careers.halodoc.com/jobs/software-engineer',
            ],
            [
                'company_name' => 'Tiket.com',
                'position' => 'QA Engineer',
                'status' => 'accepted',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-14',
                'job_url' => 'https://careers.tiket.com/jobs/qa-engineer',
            ],
            [
                'company_name' => 'Sea Labs Indonesia',
                'position' => 'Software Engineer',
                'status' => 'rejected',
                'source' => 'Company Website',
                'applied_at' => '2026-03-15',
                'job_url' => 'https://careers.sea.com/jobs/software-engineer',
            ],
        ];

        foreach ($applications as $application) {
            JobApplication::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'company_name' => $application['company_name'],
                    'position' => $application['position'],
                ],
                $application,
            );
        }
    }
}
