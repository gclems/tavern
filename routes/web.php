<?php

use App\Http\Controllers\AuthenticatedSessionController;
use App\Http\Controllers\CampaignsController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('/', function () {
        return redirect()->route('campaigns.index');
    })->name('home');

    Route::resource('campaigns', CampaignsController::class)
        ->only([
            'index',
            'store',
            'show',
            'update',
            'destroy',
        ]);

    Route::resource('campaigns.notes', NotesController::class)
        ->only([
            'store',
            'update',
            'destroy',
        ]);
});
