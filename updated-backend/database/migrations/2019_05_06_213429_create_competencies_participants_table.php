<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompetenciesParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('competencies_participants', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger("competency_id");
            $table->unsignedInteger("participant_id");
            $table->nullableTimestamps();
            $table->foreign("competency_id")->references("id")->on("competencies")->onDelete("cascade");
            $table->foreign("participant_id")->references("id")->on("participants")->onDelete("cascade");
            // $table->primary(["competency_id", "participant_id"]);
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
        Schema::dropIfExists('competencies_participants');
    }
}
