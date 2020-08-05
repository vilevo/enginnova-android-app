<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExponentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exponents', function (Blueprint $table) {
            $table->increments('id');
            $table->string("name");
            // $table->string("code", 150)->nullable(false)->unique();
            $table->string("subject");
            $table->string("website")->nullable(true);
            $table->string("phone_number");
            $table->string("image")->nullable(true);
            $table->text("description")->nullable(true);
            $table->string("enterprise_name")->nullable(true);
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
        Schema::dropIfExists('exponents');
    }
}
