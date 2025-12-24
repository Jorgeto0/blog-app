<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UnauthorizedTest extends TestCase
{
    use RefreshDatabase;

    public function test_protected_route_requires_authentication()
    {
        $response = $this->getJson('/api/me');

        $response->assertStatus(401);
    }
}
