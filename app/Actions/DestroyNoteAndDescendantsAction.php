<?php

namespace App\Actions;

use App\Models\Note;
use DB;

class DestroyNoteAndDescendantsAction
{
    public function execute(
        Note $note,
    ): void {
        $table = $note->getTable();

        DB::statement(
            "WITH RECURSIVE descendants AS (
                        SELECT id FROM $table WHERE id = ?
                        UNION ALL
                        SELECT n.id FROM $table n
                        INNER JOIN descendants d ON d.id = n.note_id
                    )
                    DELETE FROM $table WHERE id IN (SELECT id FROM descendants)",
            [$note->id]
        );
    }
}
