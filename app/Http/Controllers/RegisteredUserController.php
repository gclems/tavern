<?php

namespace App\Http\Controllers;

use App\Actions\StoreUserAction;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request, StoreUserAction $createUser): RedirectResponse
    {
        $user = $createUser->execute(
            name: $request->name,
            email: $request->email,
            password: $request->password,
        );

        Auth::login($user);

        return to_route('home');
    }
}
