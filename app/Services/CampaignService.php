<?php

namespace App\Services;

use App\Actions\StoreCampaignAction;
use App\Actions\StoreCampaignUserAction;
use App\Actions\StoreNoteCategoriesAction;
use App\Enums\Role;
use App\Models\Campaign;
use App\Models\User;

class CampaignService
{
    public function __construct(
        private readonly StoreCampaignAction $storeCampaign,
        private readonly StoreCampaignUserAction $storeCampaignUser,
        private readonly StoreNoteCategoriesAction $storeNoteCategoriesAction
    ) {}

    public function create(
        User $user,
        string $name,

    ): Campaign {

        $campaign = $this->storeCampaign->execute($name);

        $this->storeCampaignUser->execute($campaign, $user, Role::Writer);

        $this->storeNoteCategoriesAction->execute($campaign, ['Places', 'Organizations', 'People', 'Quests', 'Misc']);

        return $campaign;
    }
}
