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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            $table->string('company_name');
            $table->string('position');
            $table->enum('status', [
                'applied',
                'interview',
                'offering',
                'accepted',
                'rejected',
            ])
                ->comment('The current status of the job application.');
            $table->string('source')
                ->nullable()
                ->comment('e.g., LinkedIn, Company Website, Referral, etc.');
            $table->date('applied_at')
                ->comment('The date when the application was submitted.');
            $table->string('job_url')
                ->nullable()
                ->comment('The URL of the job posting.');
            $table->text('notes')
                ->nullable()
                ->comment('Additional notes about the application, such as interview feedback or follow-up reminders.');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
