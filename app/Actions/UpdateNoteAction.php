<?php

namespace App\Actions;

use App\Enums\Privacy;
use App\Models\Note;

class UpdateNoteAction
{
    public function execute(
        Note $note,
        string $name,
        string $content,
        Privacy $privacy
    ): Note {
        $note->update([
            'name' => $name,
            'content' => $content,
            'privacy' => $privacy,
        ]);

        return $note;
    }
}
