<?php

namespace App\Repositories;

use App\Models\TimeTable;

class TimeTableRepository
{
    /*
     * @var App/Models/TimeTable
     */
    protected $timetable;

    public function __construct(TimeTable $timetable)
    {
        $this->timetable = $timetable;
    }

}
