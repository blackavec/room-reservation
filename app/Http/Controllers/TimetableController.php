<?php

namespace App\Http\Controllers;

use App\Repositories\TimeTableRepository;
use App\Transformers\TimetableTransformer;
use League\Fractal\Resource\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests;
use Carbon\Carbon;

class TimetableController extends BaseController
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
     * @return JsonResponse
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

        return $this->json($dates, new TimetableTransformer);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        $this->validate($request , [
            'date' => 'required|date',
            'field' => 'required',
            'value' => 'required|numeric',
        ]);

        $data = $request->only(['date', 'field', 'value']);

        $this->timetable->update(
            new Carbon($data['date']),
            $data['field'],
            $data['value']
        );

        return response('', 204);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function bulkUpdate(Request $request)
    {
        $this->validate($request , [
            'dateStart' => 'required|date|before:dateEnd',
            'dateEnd' => 'required|date|after:dateStart',
            'changePriceTo' => 'required',
            'changeAvailibilityTo' => 'required|digits_between:0,5',
            'roomType' => 'required|in:single,double',
            'daysOfWeek' => 'required',
            'daysOfWeek.monday' => 'required|boolean',
            'daysOfWeek.tuesday' => 'required|boolean',
            'daysOfWeek.wednesday' => 'required|boolean',
            'daysOfWeek.thursday' => 'required|boolean',
            'daysOfWeek.friday' => 'required|boolean',
            'daysOfWeek.saturday' => 'required|boolean',
            'daysOfWeek.sunday' => 'required|boolean',
        ]);

        $data = $request->all();

        $this->timetable->bulkUpdate(
            new Carbon($data['dateStart']),
            new Carbon($data['dateEnd']),
            $data['changePriceTo'],
            $data['changeAvailibilityTo'],
            $data['roomType'],
            $data['daysOfWeek']
        );

        return response('', 200);
    }
}
