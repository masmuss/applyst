<?php

namespace App\Models;

use Database\Factories\ReminderFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reminder extends Model
{
    /** @use HasFactory<ReminderFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_application_id',
        'remind_at',
        'note',
        'is_sent',
    ];

    protected $casts = [
        'remind_at' => 'datetime',
        'is_sent' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function jobApplication(): BelongsTo
    {
        return $this->belongsTo(JobApplication::class);
    }

    public function scopePending($query)
    {
        return $query->where('is_sent', false)
            ->where('remind_at', '<=', now());
    }
}
