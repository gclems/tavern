<?php

namespace App\Http\Controllers;

use App\Actions\StoreNoteAction;
use App\Enums\Privacy;
use App\Http\Requests\CreateNoteRequest;
use App\Http\Requests\MoveNoteRequest;
use App\Models\Campaign;
use App\Models\Note;
use App\Services\NoteService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class NotesController extends Controller
{
    public function __construct(
        protected NoteService $noteService
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Campaign $campaign, CreateNoteRequest $request, StoreNoteAction $storeNoteAction): RedirectResponse
    {
        $storeNoteAction->execute(
            $request->string('name'),
            $campaign->id,
            $request->integer('note_category_id'),
            $request->has('note_id') ? $request->integer('note_id') : null,
            Privacy::from($request->string('privacy'))
        );

        return Redirect::back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function move(Note $note, MoveNoteRequest $request): RedirectResponse
    {
        $this->noteService->move(
            $note,
            $request->integer('sort_order'),
            $request->filled('parentNoteCategoryId') ? $note->noteCategory()->find($request->integer('parentNoteCategoryId')) : null,
            $request->filled('parentNoteId') ? $note->find($request->integer('parentNoteId')) : null
        );

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
