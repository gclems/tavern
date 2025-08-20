<?php

namespace App\Services;

use App\Models\Note;
use App\Models\NoteCategory;
use Illuminate\Support\Facades\Log;

class NoteService
{
    public function __construct() {}

    public function move(
        Note $note,
        int $sortOrder,
        ?NoteCategory $targetCategory = null,
        ?Note $targetNote = null,
    ): void {
        $formerOrder = $note->sort_order;

        // detect if the note need to change one of its parents (note or category)
        $changeParent = false;
        if (
            ($targetNote === null && $note->note_id !== null) ||
            ($targetNote !== null && $targetNote->id !== $note->note_id)
        ) {
            $changeParent = true;
        }

        if (
            $targetCategory !== null && $targetCategory->id !== $note->note_category_id
        ) {
            $changeParent = true;
        }

        // if no change of parent note or category -> just change order
        if (! $changeParent) {
            // adjust the siblings order
            if ($sortOrder < $formerOrder) {
                Note::where('id', '!=', $note->id)
                    ->where('note_category_id', $note->note_category_id)
                    ->where('note_id', $note->note_id)
                    ->where('sort_order', '>=', $sortOrder)
                    ->where('sort_order', '<', $formerOrder)
                    ->increment('sort_order');
            } elseif ($sortOrder > $formerOrder) {
                Note::where('id', '!=', $note->id)
                    ->where('note_category_id', $note->note_category_id)
                    ->where('note_id', $note->note_id)
                    ->where('sort_order', '<=', $sortOrder)
                    ->where('sort_order', '>', $formerOrder)
                    ->decrement('sort_order');
            }

            // save the note's new sort_order
            $note->update(['sort_order' => $sortOrder]);
        }
        // else, there's a change of parent
        else {
            $targetNoteId = null;
            $targetCategoryId = null;

            if ($targetCategory === null) {
                $targetNoteId = $targetNote?->id ?? $note->note_id;
                $targetCategoryId = $targetNote->note_category_id;
            } else {
                $targetCategoryId = $targetCategory->id;
            }

            Log::debug('CHANGE PARENT', [
                'target note' => $targetNoteId,
                'target cat' => $targetCategoryId,
            ]);

            // "adjust former siblings' sort_order
            Note::where('id', '!=', $note->id)
                ->where('note_category_id', $note->note_category_id)
                ->where('note_id', $note->note_id)
                ->where('sort_order', '>', $formerOrder)
                ->decrement('sort_order');

            // adjust the new siblings' sort_order
            Note::where('id', '!=', $note->id)
                ->where('note_category_id', $targetCategoryId)
                ->where('note_id', $targetNoteId)
                ->where('sort_order', '>=', $sortOrder)
                ->increment('sort_order');

            // "tie" the note to its new parent
            $note->update([
                'note_category_id' => $targetCategoryId,
                'note_id' => $targetNoteId,
                'sort_order' => $sortOrder,
            ]);
        }
    }
}
