<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInterestsParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interests_participants', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger("interest_id");
            $table->unsignedInteger("participant_id");
            $table->nullableTimestamps();
            $table->foreign("participant_id")->references("id")->on("participants")->onDelete("cascade");
            $table->foreign("interest_id")->references("id")->on("interests")->onDelete("cascade");
            // $table->primary(["interest_id", "participant_id"]);
            $table->engine = "InnoDB";
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('interests_participants');
    }
}
