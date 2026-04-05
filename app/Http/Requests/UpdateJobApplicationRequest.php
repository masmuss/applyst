<?php

namespace App\Http\Requests;

use App\Models\JobApplication;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateJobApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('job_application'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'company_name' => ['sometimes', 'string', 'max:255'],
            'position' => ['sometimes', 'string', 'max:255'],
            'status' => ['sometimes', Rule::in(array_keys(JobApplication::STATUSES))],
            'source' => ['nullable', 'string', 'max:255'],
            'applied_at' => ['nullable', 'date'],
            'job_url' => ['nullable', 'url', 'max:2048'],
            'notes' => ['nullable', 'string', 'max:5000'],
        ];
    }
}
