<?php

namespace App\Transformers;

use App\Models\TimeTable;
use Carbon\Carbon;
use League\Fractal\TransformerAbstract;

class TimetableTransformer extends TransformerAbstract
{
    public function transform(TimeTable $timetable)
    {
        return [
            'date' => (new Carbon($timetable->date))->format('YYYY-DD-MM'),
            'singleRoomAvailable' => $timetable->singleRoomAvailable,
            'singleRoomPrice' =>  $timetable->singleRoomPrice,
            'doubleRoomAvailable' => $timetable->doubleRoomAvailable,
            'doubleRoomPrice' => $timetable->doubleRoomPrice,
        ];
    }
}