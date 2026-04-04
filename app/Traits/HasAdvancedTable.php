<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

trait HasAdvancedTable
{
    /**
     * Scope a query to apply advanced table settings (sorting and pagination).
     *
     * @param  Builder  $query  The Eloquent query builder instance
     * @param  Request  $request  The incoming HTTP request containing table settings
     * @param  array  $allowedSorts  List of allowed columns for sorting
     * @param  string  $defaultSort  Default column to sort by if 'sort_by' is not provided or invalid
     * @return LengthAwarePaginator Paginated results with applied sorting
     */
    public function scopeAdvancedTable(Builder $query, Request $request, array $allowedSorts = [], string $defaultSort = 'created_at'): LengthAwarePaginator
    {
        // Sorting
        $sortBy = in_array($request->input('sort_by'), $allowedSorts)
            ? $request->input('sort_by')
            : $defaultSort;
        $sortDir = $request->input('sort_dir') === 'asc' ? 'asc' : 'desc';

        $query->orderBy($sortBy, $sortDir);

        // Pagination
        $perPage = in_array((int) $request->input('per_page'), [10, 20, 25, 30, 40, 50])
            ? (int) $request->input('per_page')
            : 10;

        return $query->paginate($perPage)->withQueryString();
    }
}
