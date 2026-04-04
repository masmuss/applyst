<?php

namespace App\Models;

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
        return $this->from_status
            ? JobApplication::STATUSES[$this->from_status]
            : null;
    }

    public function getToLabelAttribute(): string
    {
        return JobApplication::STATUSES[$this->to_status];
    }
}
