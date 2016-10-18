<?php

namespace App\Transformers;

use App\Models\TimeTable;
use Carbon\Carbon;
use League\Fractal\TransformerAbstract;

class TimetableTransformer extends TransformerAbstract
{
    /**
     * @param TimeTable $timetable
     * @return array
     */
    public function transform(TimeTable $timetable)
    {
        return [
            'date' => (new Carbon($timetable->date))->format('Y-d-m'),
            'singleRoomAvailable' => $timetable->single_room_available,
            'singleRoomPrice' =>  $timetable->single_room_price,
            'doubleRoomAvailable' => $timetable->double_room_available,
            'doubleRoomPrice' => $timetable->double_room_price,
        ];
    }
}