<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

trait HasFilters
{
    /**
     * Scope a query to apply filters based on model's $filterable and $searchable properties.
     *
     * @param  Builder  $query  The Eloquent query builder instance.
     * @param  Request  $request  The incoming HTTP request containing filter parameters.
     * @return Builder The modified query builder with applied filters.
     */
    public function scopeFilter(Builder $query, Request $request): Builder
    {
        $filterable = property_exists($this, 'filterable') ? $this->filterable : [];

        foreach ($filterable as $key => $operator) {
            if (! $request->filled($key)) {
                continue;
            }

            $value = $request->input($key);

            // Check for custom filter method on the model: filterBy[KeyName]
            $methodName = 'filter'.Str::studly($key);
            if (method_exists($this, $methodName)) {
                $this->$methodName($query, $value);

                continue;
            }

            // Handle relation filters (e.g., 'circles.id' => '=')
            if (str_contains($key, '.')) {
                [$relation, $column] = explode('.', $key);
                $query->whereHas($relation, function ($q) use ($column, $operator, $value) {
                    $this->applyFilter($q, $column, $operator, $value);
                });

                continue;
            }

            // Handle complex operators (e.g., 'date_ge:check_in')
            if (str_contains($operator, ':')) {
                [$op, $column] = explode(':', $operator);
                $this->applyFilter($query, $column, $op, $value);
            } else {
                $this->applyFilter($query, $key, $operator, $value);
            }
        }

        // Handle multi-column search if 'search' input is present and $searchable is defined
        if ($request->filled('search') && property_exists($this, 'searchable')) {
            $query->where(function ($q) use ($request) {
                foreach ($this->searchable as $column) {
                    $q->orWhere($column, 'like', '%'.$request->search.'%');
                }
            });
        }

        return $query;
    }

    /**
     * Apply a specific filter to the query.
     *
     * @param  Builder  $query  The Eloquent query builder instance.
     * @param  string  $column  The column to filter on.
     * @param  string  $operator  The operator to use for filtering (e.g., '=', 'like', 'date_ge').
     * @param  mixed  $value  The value to filter by.
     */
    protected function applyFilter(Builder $query, string $column, string $operator, mixed $value): void
    {
        switch ($operator) {
            case '=':
            case '>':
            case '<':
            case '>=':
            case '<=':
            case '!=':
            case 'like':
                $query->where($column, $operator, $operator === 'like' ? "%{$value}%" : $value);
                break;
            case 'date_ge':
                $query->whereDate($column, '>=', $value);
                break;
            case 'date_le':
                $query->whereDate($column, '<=', $value);
                break;
            case 'date':
                $query->whereDate($column, $value);
                break;
            case 'in':
                $query->whereIn($column, (array) $value);
                break;
        }
    }
}
