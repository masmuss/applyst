<?php

namespace App\Models;

use App\Enums\JobApplicationStatus;
use Database\Factories\ApplicationStatusLogFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicationStatusLog extends Model
{
    /** @use HasFactory<ApplicationStatusLogFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'job_application_id',
        'from_status',
        'to_status',
        'changed_at',
        'notes',
    ];

    protected $casts = [
        'changed_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    public function jobApplication(): BelongsTo
    {
        return $this->belongsTo(JobApplication::class);
    }

    public function getFromLabelAttribute(): ?string
    {
        return JobApplicationStatus::labelFor($this->from_status);
    }

    public function getToLabelAttribute(): string
    {
        return JobApplicationStatus::labelFor($this->to_status) ?? $this->to_status;
    }
}
