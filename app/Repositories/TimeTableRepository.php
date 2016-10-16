<?php

namespace App\Repositories;

use App\Models\TimeTable;
use Carbon\Carbon;

class TimeTableRepository
{
    /**
     * @var TimeTable
     */
    protected $timetable;

    /**
     * @param TimeTable $timetable
     */
    public function __construct(TimeTable $timetable)
    {
        $this->timetable = $timetable;
    }

    /**
     * find dates by range
     *
     * @param Carbon $start
     * @param Carbon $end
     *
     * @return mixed
     */
    public function findByRange(Carbon $start, Carbon $end)
    {
        return $this->timetable->whereBetween('date', [$start, $end])->get();
    }
}
