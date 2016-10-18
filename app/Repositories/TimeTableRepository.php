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
        $start->setTime(0, 0, 0);
        $end->setTime(24, 56, 56);

        return $this->timetable->whereBetween('date', [$start, $end])->get();
    }

    /**
     * @param Carbon $date
     * @param string $field
     * @param $value
     *
     * @return null
     */
    public function update(Carbon $date, $field, $value)
    {
        $date->setTime(0, 0, 0);

        $timetableBuilder = $this->timetable->where('date', $date);

        // check if date has already a reserved row in db
        if ($timetableBuilder->count() > 0) {
            $timetableBuilder->update([
                $field => $value
            ]);

            return;
        }

        // insert the field into db
        $newTimetable = $this->timetable->newInstance();

        $newTimetable->date   = $date;
        $newTimetable->$field = $value;

        $newTimetable->save();
    }
}
