<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests;

class TimelineController extends Controller
{
    /**
     * @param Request $request
     */
    public function dateList(Request $request)
    {
        $dateRange = $request->only(['start', 'end']);

        return response()->json($dateRange, 200);
    }
}
