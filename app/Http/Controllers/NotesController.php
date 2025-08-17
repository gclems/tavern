<?php

namespace App\Http\Controllers;

use App\Actions\StoreNoteAction;
use App\Enums\Privacy;
use App\Http\Requests\CreateNoteRequest;
use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class NotesController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Campaign $campaign, CreateNoteRequest $request, StoreNoteAction $storeNoteAction)
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
