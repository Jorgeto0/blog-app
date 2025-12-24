<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;

class DeleteExpiredPosts extends Command
{
    protected $signature = 'posts:delete-expired';

    protected $description = 'Delete posts that have passed their expiration time';

    public function handle(): int
    {
        $deletedCount = Post::where('expires_at', '<=', now())->delete();

        $this->info("Deleted {$deletedCount} expired posts.");

        return Command::SUCCESS;
    }
}
