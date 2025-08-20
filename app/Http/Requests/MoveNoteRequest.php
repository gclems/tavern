<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class MoveNoteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('update', $this->route('note')->campaign);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sort_order' => 'required|integer|min:0',
            'parentNoteCategoryId' => [
                'nullable',
                'integer',
                Rule::exists('App\Models\NoteCategory', 'id')->where(function (Builder $query) {
                    $query->where('campaign_id', $this->route('note')->campaign_id);
                }),
            ],
            'parentNoteId' => [
                'nullable',
                'integer',
                Rule::exists('App\Models\Note', 'id')->where(function (Builder $query) {
                    $query->where('campaign_id', $this->route('note')->campaign_id);
                }),
            ],
        ];
    }
}
