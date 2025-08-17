<?php

namespace App\Policies;

use App\Enums\Role;
use App\Models\Campaign;
use App\Models\CampaignUser;
use App\Models\User;

class CampaignPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Campaign $campaign): bool
    {
        return CampaignUser::query()
            ->whereCampaignId($campaign->id)
            ->whereUserId($user->id)
            ->exists();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Campaign $campaign): bool
    {
        return CampaignUser::query()
            ->whereCampaignId($campaign->id)
            ->whereUserId($user->id)
            ->whereRole(Role::Writer)
            ->exists();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Campaign $campaign): bool
    {
        return CampaignUser::query()
            ->whereCampaignId($campaign->id)
            ->whereUserId($user->id)
            ->whereRole(Role::Writer)
            ->exists();
    }
}
