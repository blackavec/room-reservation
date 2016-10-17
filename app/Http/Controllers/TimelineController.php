<?php

namespace App\Http\Controllers;

use App\Repositories\TimeTableRepository;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests;

class TimelineController extends Controller
{
    /**
     * @var TimeTableRepository
     */
    protected $timetable;

    public function __construct(TimeTableRepository $timetable)
    {
        $this->timetable = $timetable;
    }

    /**
     * @param Request $request
     */
    public function dateList(Request $request)
    {
        $this->validate($request , [
            'start' => 'required|date',
            'end' => 'required|date',
        ]);

        $dateRange = $request->only(['start', 'end']);


        $dates = $this->timetable->findByRange(
            new Carbon($dateRange['start']),
            new Carbon($dateRange['end'])
        );

        return response()->json($dates->toArray(), 200);
    }
}
