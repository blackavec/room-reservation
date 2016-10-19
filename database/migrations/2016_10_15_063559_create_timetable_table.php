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
            $table->bigInteger('single_room_available', false, true)->default(0);
            $table->bigInteger('single_room_price', false, true)->default(0);
            $table->bigInteger('double_room_available', false, true)->default(0);
            $table->bigInteger('double_room_price', false, true)->default(0);
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
