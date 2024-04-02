<?php

use App\Http\Controllers\CoinController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScoreController;
use App\Models\Leaderboard;
use App\Models\Score;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/stats', function () {
    return Inertia::render('Dashboard', [
        'leaderboard' => Leaderboard::with('user')->orderBy('score', 'desc')->orderBy('level', 'desc')->get(),
        'history' => Score::where('user_id', auth()->user()->id)->orderBy('updated_at', 'desc')->get(),
    ]);
})->middleware(['auth', 'verified'])->name('stats');
Route::get('/play', function () {
    return Inertia::render('Game/Levels');
})->middleware(['auth', 'verified'])->name('play');
Route::get('/inventory', [InventoryController::class, 'view'])->middleware(['auth', 'verified'])->name('inventory');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/score', [ScoreController::class, 'add'])->name('score.add');
Route::post('coins/add', [CoinController::class, 'add'])->name('coins.add');
Route::post('coins/subtract', [CoinController::class, 'subtract'])->name('coins.subtract');

Route::post('/chest/buy', [InventoryController::class, 'buyChest'])->name('chest.buy');

require __DIR__ . '/auth.php';
