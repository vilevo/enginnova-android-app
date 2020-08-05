<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('participants', function (Blueprint $table) {
            $table->increments('id');
            $table->string("last_name")->nullable(true);
            $table->string("first_name")->nullable(true);
            // $table->string('key', 100)->unique();
            $table->string('password')->nullable(true);
            $table->string("username", 150)->unique()->nullable();
            $table->string("email", 150);
            $table->date("birth_date")->nullable(true);
            $table->string("linkedin")->nullable(true);
            $table->string("facebook")->nullable(true);
            $table->string("twitter")->nullable(true);
            $table->string("phone_number", 20)->nullable();
            $table->string("job")->nullable();
            $table->boolean("csv")->default(false);
            $table->string("enterprise")->nullable();
            $table->text("biography")->nullable(true);
            $table->string("quarter")->nullable(true);
            $table->string("website")->nullable(true);
            $table->string("image")->nullable(true);
            $table->nullableTimestamps();
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
        Schema::dropIfExists('participants');
    }
}
