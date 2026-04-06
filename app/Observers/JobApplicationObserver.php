<?php

namespace App\Observers;

use App\Enums\JobApplicationStatus;
use App\Models\JobApplication;

class JobApplicationObserver
{
    public function created(JobApplication $jobApplication): void
    {
        $jobApplication->statusLogs()->create([
            'from_status' => null,
            'to_status' => $jobApplication->status,
            'changed_at' => now(),
            'notes' => 'Initial status set to '.JobApplicationStatus::labelFor($jobApplication->status),
        ]);
    }

    public function updated(JobApplication $jobApplication): void
    {
        if (! $jobApplication->wasChanged('status')) {
            return;
        }

        $previousStatus = (string) $jobApplication->getOriginal('status');

        $jobApplication->statusLogs()->create([
            'from_status' => $previousStatus,
            'to_status' => $jobApplication->status,
            'changed_at' => now(),
            'notes' => 'Status changed from '.JobApplicationStatus::labelFor($previousStatus).' to '.JobApplicationStatus::labelFor($jobApplication->status),
        ]);
    }
}
