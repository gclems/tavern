<?php

namespace App\Actions;

use App\Enums\Role;
use App\Models\Campaign;
use App\Models\User;

class StoreCampaignUserAction
{
    public function execute(Campaign $campaign, User $user, Role $role): void
    {
        $campaign->users()->attach($user, [
            'role' => $role,
        ]);
    }
}
