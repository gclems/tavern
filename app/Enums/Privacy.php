<?php

namespace App\Enums;

enum Privacy: string
{
    case Public = 'public';
    case Private = 'private';
    case Friends = 'friends';
    case Custom = 'custom';

    public function label(): string
    {
        return match ($this) {
            self::Public => __('Public'),
            self::Private => __('Private'),
            self::Friends => __('Friends'),
            self::Custom => __('Custom'),
        };
    }
}
