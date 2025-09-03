<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

/**
 * @property int $id
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property string $name
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\NoteCategory> $noteCategories
 * @property-read int|null $note_categories_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Note> $notes
 * @property-read int|null $notes_count
 * @property-read \App\Models\CampaignUser|null $campaign_user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class Campaign extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
    ];

    public function noteCategories(): HasMany
    {
        return $this->hasMany(NoteCategory::class);
    }

    public function notes(): HasManyThrough
    {
        return $this->hasManyThrough(Note::class, NoteCategory::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'campaign_user')
            ->using(CampaignUser::class)
            ->as('campaign_user')
            ->withPivot('role')
            ->withTimestamps();
    }
}
