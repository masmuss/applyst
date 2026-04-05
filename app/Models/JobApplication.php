<?php

namespace App\Models;

use App\Traits\HasAdvancedTable;
use App\Traits\HasFilters;
use Database\Factories\JobApplicationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobApplication extends Model
{
    /** @use HasFactory<JobApplicationFactory> */
    use HasAdvancedTable, HasFactory, HasFilters, SoftDeletes;

    protected $fillable = [
        'user_id',
        'company_name',
        'position',
        'status',
        'source',
        'applied_at',
        'job_url',
        'notes',
    ];

    protected $casts = [
        'applied_at' => 'date',
    ];

    protected array $filterable = [
        'status' => '=',
        'source' => 'like',
    ];

    protected array $searchable = [
        'company_name',
        'position',
    ];

    const STATUSES = [
        'applied' => 'Applied',
        'interview' => 'Interview',
        'offering' => 'Offering',
        'accepted' => 'Accepted',
        'rejected' => 'Rejected',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function statusLogs(): HasMany
    {
        return $this->hasMany(ApplicationStatusLog::class)->latest('created_at');
    }

    public function reminders(): HasMany
    {
        return $this->hasMany(Reminder::class);
    }

    protected static function booted(): void
    {
        static::created(function (JobApplication $jobApplication) {
            $jobApplication->statusLogs()->create([
                'from_status' => null,
                'to_status' => $jobApplication->status,
                'changed_at' => now(),
                'notes' => 'Initial status set to '.self::STATUSES[$jobApplication->status],
            ]);
        });

        static::updating(function (JobApplication $jobApplication) {
            if ($jobApplication->isDirty('status')) {
                $jobApplication->statusLogs()->create([
                    'from_status' => $jobApplication->getOriginal('status'),
                    'to_status' => $jobApplication->status,
                    'changed_at' => now(),
                    'notes' => 'Status changed from '.self::STATUSES[$jobApplication->getOriginal('status')].' to '.self::STATUSES[$jobApplication->status],
                ]);
            }
        });
    }
}
