<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger("participant_id");
            $table->unsignedInteger("candidat_id");
            $table->string('participant_key', 100);
            $table->foreign("participant_id")->references("id")->on("participants")->onDelete("cascade");
            $table->foreign("candidat_id")->references("id")->on("candidates")->onDelete("cascade");
            $table->unique(["candidat_id", "participant_id"]);
            $table->nullableTimestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('votes');
    }
}
