<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('application_status_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_application_id')
                ->constrained()
                ->references('id')
                ->on('job_applications')
                ->cascadeOnDelete();

            $table->enum('from_status', [
                'applied',
                'interview',
                'offering',
                'accepted',
                'rejected',
            ])
                ->nullable()
                ->comment('The previous status of the job application.');
            $table->enum('to_status', [
                'applied',
                'interview',
                'offering',
                'accepted',
                'rejected',
            ])
                ->comment('The new status of the job application.');
            $table->timestamp('changed_at')
                ->useCurrent()
                ->comment('The timestamp when the status change occurred.');
            $table->text('notes')
                ->nullable()
                ->comment('Additional notes about the status change, such as reasons for rejection or feedback from interviews.');

            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_status_logs');
    }
};
