<?php
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\MemoireController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schedule;

Schedule::command('sanctum:prune-expired --hours=24')->daily();

//Authentification
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
//Route::post('/logout', [AuthController::class, 'destroy']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('theme/submit', [MemoireController::class, 'store']);
    Route::get('/get-memoires', [MemoireController::class, 'getAll']);
    Route::get('/get-memoire', [MemoireController::class, 'getOne']);
    Route::get('/memoires-by-domain', [MemoireController::class, 'themesFilterByDomain']);
});

Route::get('/test', function() {
    return "Hello World";
});

