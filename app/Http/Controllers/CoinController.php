<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CoinController extends Controller
{
    public function add(Request $request) {

        $user = Auth::user();
        $user->coins += $request->coins;
        $user->save();
    }

    public function subtract(Request $request) {

        $user = Auth::user();
        $user->coins -= $request->coins;
        $user->save();
    }
}
