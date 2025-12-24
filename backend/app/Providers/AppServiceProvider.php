<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Post;
use App\Models\Comment;
use App\Policies\PostPolicy ;
use App\Policies\CommentPolicy;


class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
    Post::class => PostPolicy::class,
    Comment::class => CommentPolicy::class,
    ];
    
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
