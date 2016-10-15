<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTimetableTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timetable', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id')->index();
            $table->dateTimeTz('date');
            $table->integer('single_room_available')->nullable();
            $table->float('single_room_price')->nullable();
            $table->integer('double_room_available')->nullable();
            $table->float('double_room_price')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('timetable');
    }
}
