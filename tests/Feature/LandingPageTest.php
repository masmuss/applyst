<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;
use Tests\TestCase;

class LandingPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_landing_page_can_be_rendered(): void
    {
        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('landing')
                ->where('canRegister', Features::enabled(Features::registration()))
            );
    }

    public function test_landing_page_contains_default_seo_meta_tags(): void
    {
        $canonicalUrl = rtrim(config('app.url'), '/');

        $this->get(route('home'))
            ->assertOk()
            ->assertSee('name="description" content="Track job applications, monitor your job search effectiveness, and keep follow-ups organized in one clean dashboard."', false)
            ->assertSee('property="og:type" content="website"', false)
            ->assertSee('property="og:title" content="Track your job applications effectively - applyst"', false)
            ->assertSee('property="og:image" content="'.$canonicalUrl.'/og.png?v=', false)
            ->assertSee('name="twitter:card" content="summary_large_image"', false)
            ->assertSee('rel="canonical" href="'.$canonicalUrl.'"', false);
    }
}
