<?php

namespace App\Actions;

use App\Models\Campaign;

class StoreNoteCategoriesAction
{
    public function execute(Campaign $campaign, array $names): void
    {
        $order = $campaign->noteCategories()->max('sort_order') ?? 0;
        foreach ($names as $name) {
            $campaign->noteCategories()->create([
                'name' => $name,
                'sort_order' => $order++,
            ]);
        }
    }
}
