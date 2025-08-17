<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('campaign_id')->constrained();
            $table->foreignId('note_category_id')->constrained();
            $table->foreignId('note_id')->nullable()->constrained();
            $table->string('name', 255);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->string('privacy', 50)->default('public');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
