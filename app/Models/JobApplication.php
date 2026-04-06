<?php

namespace App\Models;

use App\Enums\JobApplicationStatus;
use App\Observers\JobApplicationObserver;
use App\Traits\HasAdvancedTable;
use App\Traits\HasFilters;
use Database\Factories\JobApplicationFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'user_id',
    'company_name',
    'position',
    'status',
    'source',
    'applied_at',
    'job_url',
    'notes',
])]
#[ObservedBy([JobApplicationObserver::class])]
class JobApplication extends Model
{
    /** @use HasFactory<JobApplicationFactory> */
    use HasAdvancedTable, HasFactory, HasFilters, SoftDeletes;

    protected function casts(): array
    {
        return [
            'applied_at' => 'date',
        ];
    }

    protected array $filterable = [
        'status' => '=',
        'source' => 'like',
    ];

    protected array $searchable = [
        'company_name',
        'position',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function statuses(): array
    {
        return JobApplicationStatus::options();
    }

    public function statusLogs(): HasMany
    {
        return $this->hasMany(ApplicationStatusLog::class)->latest('created_at');
    }

    public function reminders(): HasMany
    {
        return $this->hasMany(Reminder::class);
    }
}
