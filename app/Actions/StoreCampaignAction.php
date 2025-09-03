<?php

namespace App\Actions;

use App\Models\Campaign;

class StoreCampaignAction
{
    public function execute(string $name): Campaign
    {
        return Campaign::create([
            'name' => $name,
        ]);
    }
}
