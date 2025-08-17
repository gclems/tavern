<?php

namespace App\Enums;

enum Role: string
{
    case Viewer = 'viewer';
    case Writer = 'writer';

    public function label(): string
    {
        return match ($this) {
            self::Viewer => __('Viewer'),
            self::Writer => __('Writer'),
        };
    }
}
