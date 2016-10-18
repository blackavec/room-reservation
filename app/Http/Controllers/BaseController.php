<?php

namespace App\Http\Controllers;

use League\Fractal\Serializer\DataArraySerializer;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;
use League\Fractal\Manager;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;

class BaseController extends Controller
{
    /**
     * @param $data
     * @param $transformer
     * @param int $responseCode
     *
     * @return JsonResponse
     */
    public function json($data, $transformer, $responseCode = 200)
    {
        $manager = new Manager();

        $manager->setSerializer(new DataArraySerializer());

        $resource = new Collection($data, $transformer);

        return response()->json($manager->createData($resource)->toArray(), $responseCode);
    }
}
