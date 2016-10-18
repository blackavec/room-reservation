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
            $table->integer('single_room_available')->default(0);
            $table->float('single_room_price')->default(0);
            $table->integer('double_room_available')->default(0);
            $table->float('double_room_price')->default(0);
            $table->timestamps();
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
