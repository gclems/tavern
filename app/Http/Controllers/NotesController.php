<?php

namespace App\Http\Controllers;

use App\Actions\DestroyNoteAndDescendantsAction;
use App\Actions\StoreNoteAction;
use App\Actions\UpdateNoteAction;
use App\Enums\Privacy;
use App\Http\Requests\CreateNoteRequest;
use App\Http\Requests\DeleteNoteRequest;
use App\Http\Requests\MoveNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Models\Campaign;
use App\Models\Note;
use App\Models\NoteCategory;
use App\Services\NoteService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class NotesController extends Controller
{
    public function __construct(
        protected NoteService $noteService,
        protected UpdateNoteAction $updateNoteAction,
        protected DestroyNoteAndDescendantsAction $destroyNoteAndDescendantsAction
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Campaign $campaign, CreateNoteRequest $request, StoreNoteAction $storeNoteAction): RedirectResponse
    {
        $created = $storeNoteAction->execute(
            $request->string('name'),
            $campaign->id,
            $request->integer('note_category_id'),
            $request->has('note_id') ? $request->integer('note_id') : null,
            Privacy::from($request->string('privacy'))
        );

        return Redirect::back()->with('created_note_id', $created->id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Note $note, UpdateNoteRequest $request): RedirectResponse
    {
        $this->updateNoteAction->execute(
            $note,
            $request->string('name'),
            $request->string('content'),
            Privacy::from($request->string('privacy')),
        );

        return Redirect::back();
    }

    public function move(Note $note, MoveNoteRequest $request): RedirectResponse
    {
        $this->noteService->move(
            $note,
            $request->integer('sort_order'),
            $request->filled('parentNoteCategoryId') ? NoteCategory::find($request->integer('parentNoteCategoryId')) : null,
            $request->filled('parentNoteId') ? Note::find($request->integer('parentNoteId')) : null
        );

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note, DeleteNoteRequest $request): RedirectResponse
    {
        $this->destroyNoteAndDescendantsAction->execute($note);

        return Redirect::back();
    }
}
