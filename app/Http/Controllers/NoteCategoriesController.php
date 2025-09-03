<?php

namespace App\Http\Controllers;

use App\Actions\MoveNoteCategoryAction;
use App\Http\Requests\MoveNoteCategoryRequest;
use App\Models\NoteCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class NoteCategoriesController extends Controller
{
    public function __construct(
        protected MoveNoteCategoryAction $moveNoteCategoryAction,
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): void
    {
        //
    }

    public function move(NoteCategory $noteCategory, MoveNoteCategoryRequest $request): RedirectResponse
    {
        $this->moveNoteCategoryAction->execute($noteCategory, $request->integer('sortOrder'));

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): void
    {
        //
    }
}
