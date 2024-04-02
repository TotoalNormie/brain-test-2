<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leaderboard extends Model
{
    use HasFactory;

    protected $fillable = [
        'score',
        'level',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
