<?php
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\MemoireController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schedule;

Schedule::command('sanctum:prune-expired --hours=24')->daily();

//Authentification
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'destroy']);

Route::group(['middleware' => ['auth:sanctum'], 'prefix' => 'theme'], function () {
    Route::get('/get-all', [MemoireController::class, 'getAll']);

    Route::post('/submit', [MemoireController::class, 'store']);
});
