<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'body',
        'user_id',
        'post_id',
    ];

    protected $appends = ['user'];
    
    public function author() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getUserAttribute()
    {
        return $this->author;
    }

    public function post() {
        return $this->belongsTo(Post::class);
    }

}
