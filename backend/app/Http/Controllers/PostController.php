<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::with(['author', 'tags', 'comments'])
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'tags' => 'required|array|min:1',
            'tags.*' => 'string',
        ]);

        $post = auth()->user()->posts()->create([
            'title' => $data['title'],
            'body' => $data['body'],
            'expires_at' => now()->addHours(24),
        ]);

        $tagIds = collect($data['tags'])->map(function ($name) {
            return Tag::firstOrCreate(['name' => $name])->id;
        });

        $post->tags()->sync($tagIds);

        return response()->json($post->load('tags'), 201);
    }

    public function update(Request $request, Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            abort(403);
        }

        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'body' => 'sometimes|string',
            'tags' => 'sometimes|array|min:1',
            'tags.*' => 'string',
        ]);

        $post->update($request->only('title', 'body'));

        if (isset($data['tags'])) {
            $tagIds = collect($data['tags'])->map(function ($name) {
                return Tag::firstOrCreate(['name' => $name])->id;
            });

            $post->tags()->sync($tagIds);
        }

        return $post->load('tags');
    }

    public function destroy(Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            abort(403);
        }

        $post->delete();

        return response()->noContent();
    }
}
