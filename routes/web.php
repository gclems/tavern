<?php

use App\Http\Controllers\AuthenticatedSessionController;
use App\Http\Controllers\CampaignsController;
use App\Http\Controllers\NoteCategoriesController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function (): void {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function (): void {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('/', fn () => redirect()->route('campaigns.index'))->name('home');

    Route::resource('campaigns', CampaignsController::class)
        ->only([
            'index',
            'store',
            'show',
            'update',
            'destroy',
        ]);

    Route::post('campaigns/{campaign}/notes', [NotesController::class, 'store'])
        ->name('campaigns.notes.store');

    Route::put('noteCategories/{noteCategory}/move', [NoteCategoriesController::class, 'move'])
        ->name('noteCategories.move');

    Route::put('notes/{note}', [NotesController::class, 'update'])
        ->name('notes.update');

    Route::delete('notes/{note}', [NotesController::class, 'destroy'])
        ->name('notes.destroy');

    Route::post('notes/{note}/move', [NotesController::class, 'move'])
        ->name('notes.move');
});
