<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCandidateParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('candidate_participants', function (Blueprint $table) {
            $table->increments('id');
            $table->string("last_name");
            $table->string("first_name")->nullable(true);
            $table->string("status");
            $table->string("gender")->nullable(true);
            $table->nullableTimestamps();
            $table->unsignedInteger("candidate_id");
            $table->foreign("candidate_id")->references("id")->on("candidates");
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
        Schema::dropIfExists('candidate_participants');
    }
}
