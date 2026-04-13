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
                'applied_at' => '2026-02-24',
                'job_url' => 'https://careers.nusantaratech.id/jobs/frontend-engineer',
                'notes' => 'Tailwind-heavy product dashboard role. Waiting for first recruiter response.',
            ],
            [
                'company_name' => 'Gojek',
                'position' => 'Software Engineer',
                'status' => 'interview',
                'source' => 'Company Website',
                'applied_at' => '2026-02-25',
                'job_url' => 'https://careers.gojek.com/jobs/software-engineer',
                'notes' => 'Passed initial recruiter screening. Technical interview already scheduled.',
            ],
            [
                'company_name' => 'Traveloka',
                'position' => 'Product Engineer',
                'status' => 'offering',
                'source' => 'Referral',
                'applied_at' => '2026-02-26',
                'job_url' => 'https://careers.traveloka.com/jobs/product-engineer',
                'notes' => 'Completed panel interview. HR preparing formal compensation package.',
            ],
            [
                'company_name' => 'Bukalapak',
                'position' => 'UI Engineer',
                'status' => 'rejected',
                'source' => 'LinkedIn',
                'applied_at' => '2026-02-27',
                'job_url' => 'https://careers.bukalapak.com/jobs/ui-engineer',
                'notes' => 'Reached technical round but did not continue after design system deep dive.',
            ],
            [
                'company_name' => 'Mekari',
                'position' => 'Frontend Developer',
                'status' => 'accepted',
                'source' => 'Indeed',
                'applied_at' => '2026-02-28',
                'job_url' => 'https://career.mekari.com/jobs/frontend-developer',
                'notes' => 'Offer accepted. Start date discussed for next month.',
            ],
            [
                'company_name' => 'Xendit',
                'position' => 'Backend Engineer',
                'status' => 'interview',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-01',
                'job_url' => 'https://www.xendit.co/careers/backend-engineer',
                'notes' => 'System design interview pending. Focus on queue consistency and idempotency.',
            ],
            [
                'company_name' => 'Ruangguru',
                'position' => 'Full Stack Engineer',
                'status' => 'rejected',
                'source' => 'Company Website',
                'applied_at' => '2026-03-02',
                'job_url' => 'https://career.ruangguru.com/jobs/full-stack-engineer',
                'notes' => 'Rejected after final round due to stronger experience match from other candidates.',
            ],
            [
                'company_name' => 'Kredivo',
                'position' => 'Software Engineer II',
                'status' => 'offering',
                'source' => 'Referral',
                'applied_at' => '2026-03-03',
                'job_url' => 'https://careers.kredivo.com/jobs/software-engineer-ii',
                'notes' => 'Verbal offer already given. Waiting for written offer and stock details.',
            ],
            [
                'company_name' => 'Blibli',
                'position' => 'Frontend Engineer',
                'status' => 'applied',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-04',
                'job_url' => 'https://careers.blibli.com/jobs/frontend-engineer',
                'notes' => 'Application submitted with portfolio and side-project links.',
            ],
            [
                'company_name' => 'Dana',
                'position' => 'Platform Engineer',
                'status' => 'accepted',
                'source' => 'Company Website',
                'applied_at' => '2026-03-05',
                'job_url' => 'https://careers.dana.id/jobs/platform-engineer',
                'notes' => 'Accepted after completing architecture and reliability rounds.',
            ],
            [
                'company_name' => 'Ajaib',
                'position' => 'Mobile Engineer',
                'status' => 'rejected',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-06',
                'job_url' => 'https://career.ajaib.co.id/jobs/mobile-engineer',
                'notes' => 'Rejected after coding assessment for not meeting platform-specific requirement.',
            ],
            [
                'company_name' => 'Sirclo',
                'position' => 'Frontend Engineer',
                'status' => 'interview',
                'source' => 'Referral',
                'applied_at' => '2026-03-07',
                'job_url' => 'https://careers.sirclo.com/jobs/frontend-engineer',
                'notes' => 'Interview process in progress with emphasis on component architecture.',
            ],
            [
                'company_name' => 'Halodoc',
                'position' => 'Software Engineer',
                'status' => 'accepted',
                'source' => 'Company Website',
                'applied_at' => '2026-03-08',
                'job_url' => 'https://careers.halodoc.com/jobs/software-engineer',
                'notes' => 'Accepted after final culture-fit call and reference checks.',
            ],
            [
                'company_name' => 'Tiket.com',
                'position' => 'QA Engineer',
                'status' => 'offering',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-09',
                'job_url' => 'https://careers.tiket.com/jobs/qa-engineer',
                'notes' => 'Reached offer stage after automation strategy presentation.',
            ],
            [
                'company_name' => 'Sea Labs Indonesia',
                'position' => 'Software Engineer',
                'status' => 'rejected',
                'source' => 'Company Website',
                'applied_at' => '2026-03-10',
                'job_url' => 'https://careers.sea.com/jobs/software-engineer',
                'notes' => 'Rejected after final discussion due to team fit and role scope mismatch.',
            ],
            [
                'company_name' => 'Tokopedia',
                'position' => 'Data Engineer',
                'status' => 'applied',
                'source' => 'Referral',
                'applied_at' => '2026-03-11',
                'job_url' => 'https://careers.tokopedia.com/jobs/data-engineer',
                'notes' => 'Applied with event-streaming and warehouse optimization portfolio.',
            ],
            [
                'company_name' => 'OVO',
                'position' => 'Backend Engineer',
                'status' => 'interview',
                'source' => 'Company Website',
                'applied_at' => '2026-03-12',
                'job_url' => 'https://careers.ovo.id/jobs/backend-engineer',
                'notes' => 'Interviewing for payment reliability and fraud-prevention services.',
            ],
            [
                'company_name' => 'Sociolla',
                'position' => 'Frontend Engineer',
                'status' => 'offering',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-13',
                'job_url' => 'https://careers.sociolla.com/jobs/frontend-engineer',
                'notes' => 'Moved to offer stage after ecommerce performance optimization interview.',
            ],
            [
                'company_name' => 'Jenius',
                'position' => 'Mobile Engineer',
                'status' => 'accepted',
                'source' => 'Indeed',
                'applied_at' => '2026-03-14',
                'job_url' => 'https://careers.jenius.com/jobs/mobile-engineer',
                'notes' => 'Accepted after pair programming round and architecture discussion.',
            ],
            [
                'company_name' => 'eFishery',
                'position' => 'Software Engineer',
                'status' => 'rejected',
                'source' => 'LinkedIn',
                'applied_at' => '2026-03-15',
                'job_url' => 'https://careers.efishery.com/jobs/software-engineer',
                'notes' => 'Rejected after live coding session due to domain-specific constraints.',
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
