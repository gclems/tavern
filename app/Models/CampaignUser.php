<?php

namespace App\Models;

use App\Enums\Role;
use Illuminate\Database\Eloquent\Relations\Pivot as RelationsPivot;

/**
 * @property int $campaign_id
 * @property int $user_id
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property Role $role
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampaignUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampaignUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampaignUser query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampaignUser whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampaignUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampaignUser whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampaignUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampaignUser whereUserId($value)
 *
 * @mixin \Eloquent
 */
class CampaignUser extends RelationsPivot
{
    protected function casts()
    {
        return [
            'role' => Role::class,
        ];
    }
}
