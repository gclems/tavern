<?php

namespace App\Actions;

use App\Models\Note;
use App\Models\NoteCategory;

class ChangeNoteParentAction
{
    public function execute(
        Note $note,
        NoteCategory $targetCategory,
        ?Note $targetNote = null,
    ): Note {
        $note->update([
            'note_category_id' => $targetCategory->id,
            'note_id' => $targetNote?->id,
        ]);

        return $note;
    }
}
