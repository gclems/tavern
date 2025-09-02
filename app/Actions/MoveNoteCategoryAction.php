<?php

namespace App\Actions;

use App\Models\NoteCategory;
use Illuminate\Support\Facades\Log;

class MoveNoteCategoryAction
{
    public function execute(
        NoteCategory $noteCategory,
        int $sortOrder,
    ): void {
        Log::debug('ACTION', [
            'noteCategory' => $noteCategory->id,
            'sortOrder' => $sortOrder,
        ]);

        if ($sortOrder == $noteCategory->sort_order) {
            return;
        }

        if ($sortOrder < $noteCategory->sort_order) {
            NoteCategory::where('id', '!=', $noteCategory->id)
                ->where('campaign_id', $noteCategory->campaign_id)
                ->where('sort_order', '>=', $sortOrder)
                ->where('sort_order', '<', $noteCategory->sort_order)
                ->increment('sort_order');

        } else {
            NoteCategory::where('id', '!=', $noteCategory->id)
                ->where('campaign_id', $noteCategory->campaign_id)
                ->where('sort_order', '<=', $sortOrder)
                ->where('sort_order', '>', $noteCategory->sort_order)
                ->decrement('sort_order');
        }

        $noteCategory->update(['sort_order' => $sortOrder]);
    }
}
