<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property int $campaign_id
 * @property string $name
 * @property int $sort_order
 * @property-read \App\Models\Campaign $campaign
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Note> $notes
 * @property-read int|null $notes_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NoteCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NoteCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NoteCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NoteCategory whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NoteCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NoteCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NoteCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NoteCategory whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|NoteCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class NoteCategory extends Model
{
    protected $fillable = [
        'name',
        'sort_order',
    ];

    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
}
