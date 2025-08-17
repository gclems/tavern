<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Auth\Events\Registered;

class StoreUserAction
{
    public function execute(string $name, string $email, string $password): User
    {
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => bcrypt($password),
        ]);

        event(new Registered($user));

        return $user;
    }
}
