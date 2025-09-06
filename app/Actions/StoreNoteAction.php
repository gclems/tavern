<?php

namespace App\Actions;

use App\Enums\Privacy;
use App\Models\Note;

class StoreNoteAction
{
    public function execute(
        string $name,
        int $campaignId,
        int $noteCategoryId,
        ?int $noteId = null,
        Privacy $privacy = Privacy::Public
    ): Note {
        return Note::create([
            'name' => $name,
            'campaign_id' => $campaignId,
            'note_category_id' => $noteCategoryId,
            'note_id' => $noteId,
            'privacy' => $privacy,
        ]);
    }
}
