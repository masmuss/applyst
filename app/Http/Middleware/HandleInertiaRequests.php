<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'seo' => $this->seo($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    /**
     * @return array<string, string>
     */
    private function seo(Request $request): array
    {
        $appName = (string) config('app.name', 'applyst');
        $title = 'Track your job applications effectively';
        $description = 'Track job applications, monitor job search effectiveness, and keep follow-ups organized in one place.';
        $robots = 'index, follow';
        $ogImageVersion = file_exists(public_path('og.png')) ? filemtime(public_path('og.png')) : time();

        if ($request->routeIs('home')) {
            $title = 'Track your job applications effectively';
            $description = 'Track job applications, monitor your job search effectiveness, and keep follow-ups organized in one clean dashboard.';
        }

        if (
            $request->routeIs('dashboard')
            || $request->routeIs('job-applications.*')
            || $request->routeIs('settings.*')
            || $request->routeIs('login')
            || $request->routeIs('register')
            || $request->routeIs('password.*')
            || $request->routeIs('verification.*')
            || $request->routeIs('two-factor.*')
            || $request->routeIs('password.confirm')
        ) {
            $robots = 'noindex, nofollow';
        }

        return [
            'title' => $title,
            'fullTitle' => $title.' - '.$appName,
            'description' => $description,
            'url' => $request->url(),
            'type' => 'website',
            'image' => asset('og.png').'?v='.$ogImageVersion,
            'siteName' => $appName,
            'robots' => $robots,
        ];
    }
}
