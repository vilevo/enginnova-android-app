<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExponentTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exponent_teams', function (Blueprint $table) {
            $table->increments('id');
            $table->string("last_name");
            $table->string("first_name")->nullable(true);
            $table->string("status");
            $table->string("gender")->nullable(true);
            $table->nullableTimestamps();
            $table->unsignedInteger("exponent_id");
            $table->foreign("exponent_id")->references("id")->on("exponents");
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
        Schema::dropIfExists('exponent_teams');
    }
}
