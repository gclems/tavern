<?php

namespace App\Http\Requests;

use App\Enums\Privacy;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class CreateNoteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('update', $this->route('campaign'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'note_category_id' => [
                'required',
                'integer',
                Rule::exists(\App\Models\NoteCategory::class, 'id')->where(function (Builder $query): void {
                    $query->where('campaign_id', $this->route('campaign')->id);
                }),
            ],
            'note_id' => [
                'nullable',
                'integer',
                Rule::exists(\App\Models\Note::class, 'id')->where(function (Builder $query): void {
                    $query->where('campaign_id', $this->route('campaign')->id)
                        ->where('note_category_id', $this->integer('note_category_id'));
                }),
            ],
            'privacy' => [
                'required',
                'string',
                Rule::enum(Privacy::class),
            ],
        ];
    }
}
