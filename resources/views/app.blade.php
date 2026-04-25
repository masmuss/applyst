<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        @php
            $faviconIcoVersion = file_exists(public_path('favicon.ico')) ? filemtime(public_path('favicon.ico')) : time();
            $faviconSvgVersion = file_exists(public_path('favicon.svg')) ? filemtime(public_path('favicon.svg')) : time();
            $appleTouchIconVersion = file_exists(public_path('apple-touch-icon.png')) ? filemtime(public_path('apple-touch-icon.png')) : time();
            $ogImageVersion = file_exists(public_path('og.png')) ? filemtime(public_path('og.png')) : time();
            $appName = config('app.name', 'applyst');
            $defaultDescription = 'Track job applications, monitor job search effectiveness, and keep follow-ups organized in one place.';
            $defaultTitle = $appName.' - Track your job applications effectively';
            $defaultOgImage = asset('og.png').'?v='.$ogImageVersion;
            $currentUrl = url()->current();
            $seo = $page['props']['seo'] ?? [];
            $seoTitle = $seo['fullTitle'] ?? $defaultTitle;
            $seoDescription = $seo['description'] ?? $defaultDescription;
            $seoUrl = $seo['url'] ?? $currentUrl;
            $seoType = $seo['type'] ?? 'website';
            $seoImage = $seo['image'] ?? $defaultOgImage;
            $seoSiteName = $seo['siteName'] ?? $appName;
            $seoRobots = $seo['robots'] ?? 'index, follow';
        @endphp

        <link rel="icon" href="{{ asset('favicon.ico') }}?v={{ $faviconIcoVersion }}" sizes="any">
        <link rel="icon" href="{{ asset('favicon.svg') }}?v={{ $faviconSvgVersion }}" type="image/svg+xml">
        <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}?v={{ $appleTouchIconVersion }}">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ $seoTitle }}</title>
            <meta data-inertia="description" name="description" content="{{ $seoDescription }}">
            <meta data-inertia="robots" name="robots" content="{{ $seoRobots }}">
            <link data-inertia="canonical" rel="canonical" href="{{ $seoUrl }}">

            <meta data-inertia="og:type" property="og:type" content="{{ $seoType }}">
            <meta data-inertia="og:title" property="og:title" content="{{ $seoTitle }}">
            <meta data-inertia="og:description" property="og:description" content="{{ $seoDescription }}">
            <meta data-inertia="og:url" property="og:url" content="{{ $seoUrl }}">
            <meta data-inertia="og:image" property="og:image" content="{{ $seoImage }}">
            <meta data-inertia="og:site_name" property="og:site_name" content="{{ $seoSiteName }}">

            <meta data-inertia="twitter:card" name="twitter:card" content="summary_large_image">
            <meta data-inertia="twitter:title" name="twitter:title" content="{{ $seoTitle }}">
            <meta data-inertia="twitter:description" name="twitter:description" content="{{ $seoDescription }}">
            <meta data-inertia="twitter:image" name="twitter:image" content="{{ $seoImage }}">
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
