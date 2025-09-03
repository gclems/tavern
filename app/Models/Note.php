<?php

namespace App\Models;

use App\Enums\Privacy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property int $campaign_id
 * @property int $note_category_id
 * @property int|null $note_id
 * @property string $name
 * @property int $sort_order
 * @property Privacy $privacy
 * @property string|null $content
 * @property-read \App\Models\Campaign $campaign
 * @property-read Note|null $note
 * @property-read \App\Models\NoteCategory $noteCategory
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Note> $notes
 * @property-read int|null $notes_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note whereNoteCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note whereNoteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note wherePrivacy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Note whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class Note extends Model
{
    protected $fillable = [
        'name',
        'content',
        'campaign_id',
        'note_category_id',
        'note_id',
        'privacy',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'privacy' => Privacy::class,
        ];
    }

    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }

    public function noteCategory(): BelongsTo
    {
        return $this->belongsTo(NoteCategory::class);
    }

    public function note(): BelongsTo
    {
        return $this->belongsTo(Note::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
}
