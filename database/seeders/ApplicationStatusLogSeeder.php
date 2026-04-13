<?php

namespace Database\Seeders;

use App\Enums\JobApplicationStatus;
use App\Models\JobApplication;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ApplicationStatusLogSeeder extends Seeder
{
    /**
     * @var array<int, array{to_status: string, days_after_applied: int, notes: string}>
     */
    private array $acceptedProgressTemplate = [
        [
            'to_status' => JobApplicationStatus::Interview->value,
            'days_after_applied' => 4,
            'notes' => 'Recruiter screening call completed and moved to interview stage.',
        ],
        [
            'to_status' => JobApplicationStatus::Offering->value,
            'days_after_applied' => 12,
            'notes' => 'Final panel feedback was positive and compensation discussion started.',
        ],
        [
            'to_status' => JobApplicationStatus::Accepted->value,
            'days_after_applied' => 16,
            'notes' => 'Offer accepted after package negotiation.',
        ],
    ];

    /**
     * @var array<int, array{to_status: string, days_after_applied: int, notes: string}>
     */
    private array $rejectedProgressTemplate = [
        [
            'to_status' => JobApplicationStatus::Interview->value,
            'days_after_applied' => 3,
            'notes' => 'Passed CV shortlist and invited to technical interview.',
        ],
        [
            'to_status' => JobApplicationStatus::Rejected->value,
            'days_after_applied' => 8,
            'notes' => 'Rejected after technical interview due to stronger competing candidates.',
        ],
    ];

    /**
     * @var array<int, array{to_status: string, days_after_applied: int, notes: string}>
     */
    private array $offeringProgressTemplate = [
        [
            'to_status' => JobApplicationStatus::Interview->value,
            'days_after_applied' => 5,
            'notes' => 'Completed hiring manager interview and moved to final stage.',
        ],
        [
            'to_status' => JobApplicationStatus::Offering->value,
            'days_after_applied' => 11,
            'notes' => 'Verbal offer received and waiting for formal letter.',
        ],
    ];

    /**
     * @var array<int, array{to_status: string, days_after_applied: int, notes: string}>
     */
    private array $interviewProgressTemplate = [
        [
            'to_status' => JobApplicationStatus::Interview->value,
            'days_after_applied' => 4,
            'notes' => 'Phone screening passed and interview schedule confirmed.',
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /** @var Collection<int, JobApplication> $applications */
        $applications = JobApplication::query()
            ->orderBy('id')
            ->get();

        foreach ($applications as $application) {
            $application->statusLogs()->delete();

            $appliedAt = Carbon::parse($application->applied_at)->setTime(9, 0);

            $rows = [[
                'job_application_id' => $application->id,
                'from_status' => null,
                'to_status' => JobApplicationStatus::Applied->value,
                'changed_at' => $appliedAt,
                'created_at' => $appliedAt,
                'notes' => 'Initial status set to Applied',
            ]];

            $progressEntries = $this->buildProgressEntries($application);
            $previousStatus = JobApplicationStatus::Applied->value;

            foreach ($progressEntries as $entry) {
                $changedAt = Carbon::parse($application->applied_at)
                    ->addDays($entry['days_after_applied'])
                    ->setTime(14, 30);

                $rows[] = [
                    'job_application_id' => $application->id,
                    'from_status' => $previousStatus,
                    'to_status' => $entry['to_status'],
                    'changed_at' => $changedAt,
                    'created_at' => $changedAt,
                    'notes' => $entry['notes'],
                ];

                $previousStatus = $entry['to_status'];
            }

            DB::table('application_status_logs')->insert($rows);
        }
    }

    /**
     * @return array<int, array{to_status: string, days_after_applied: int, notes: string}>
     */
    private function buildProgressEntries(JobApplication $application): array
    {
        return match ($application->status) {
            JobApplicationStatus::Accepted->value => $this->acceptedProgressTemplate,
            JobApplicationStatus::Rejected->value => $this->rejectedProgressTemplate,
            JobApplicationStatus::Offering->value => $this->offeringProgressTemplate,
            JobApplicationStatus::Interview->value => $this->interviewProgressTemplate,
            default => [],
        };
    }
}
