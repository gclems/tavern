<?php

namespace App\Actions;

use App\Models\Campaign;

class StoreCampaignAction
{
    public function execute(string $name): Campaign
    {
        $campaign = Campaign::create([
            'name' => $name,
        ]);

        return $campaign;
    }
}
