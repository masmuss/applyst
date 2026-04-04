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
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
            $table->foreignId('job_application_id')
                ->constrained()
                ->references('id')
                ->on('job_applications')
                ->cascadeOnDelete();

            $table->timestamp('remind_at')
                ->comment('The date and time when the reminder should trigger.');
            $table->string('note')
                ->nullable()
                ->comment('A note about the reminder.');
            $table->boolean('is_sent')
                ->default(false)
                ->comment('Indicates whether the reminder has been sent.');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reminders');
    }
};
