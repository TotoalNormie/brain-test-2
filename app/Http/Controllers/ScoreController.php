<?php

namespace App\Http\Controllers;

use App\Models\Leaderboard;
use App\Models\Score;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    public function add(Request $request)
    {
        Score::create([
            'score' => $request->score,
            'user_id' => auth()->user()->id,
            'level' => $request->level,
            'gameWon' => $request->gameWon,
        ]);

        $leaderboard = Leaderboard::where('user_id', auth()->user()->id)->first();
        if ($leaderboard) {
            $leaderboard->score = $request->score;
            $leaderboard->level = $request->level;
            $leaderboard->save();
        } else {
            Leaderboard::create([
                'user_id' => auth()->user()->id,
                'score' => $request->score,
                'level' => $request->level,
            ]);
        }


    }
}
