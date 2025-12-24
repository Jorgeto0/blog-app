<?php

namespace Tests\Feature\Post;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_cannot_update_another_users_post()
    {
        $owner = User::factory()->create();
        $attacker = User::factory()->create();

        $post = Post::factory()->create([
            'user_id' => $owner->id,
        ]);

        $login = $this->postJson('/api/login', [
            'email' => $attacker->email,
            'password' => 'password',
        ]);

        $token = $login->json('access_token');

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->putJson("/api/posts/{$post->id}", [
                'title' => 'Hacked',
                'body' => 'Nope',
                'tags' => ['php'],
            ]);

        $response->assertStatus(403);
    }

    public function test_user_can_update_own_post()
    {
        [$user, $token] = $this->authenticate();

        $post = Post::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->putJson("/api/posts/{$post->id}", [
                'title' => 'Updated',
                'body' => 'Updated body',
                'tags' => ['laravel'],
            ]);

        $response->assertStatus(200);
    }
}
