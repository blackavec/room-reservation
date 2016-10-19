<?php

namespace App\Tests\Unit\Repositories;

use App\Repositories\TimeTableRepository;
use Illuminate\Database\Eloquent\Builder;
use App\Models\TimeTable;
use App\Tests\TestCase;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Mockery as m;

/**
 * @coversDefaultClass \App\Models\TimeTable
 */
class TimetableRepositoryTest extends TestCase
{
    /**
     * @var TimeTable
     */
    protected $timetableModel;

    /**
     * @var TimeTableRepository
     */
    protected $timetableRepo;

    public function setUp()
    {
        $this->timetableModel = m::mock(TimeTable::class);
        $this->timetableRepo  = new TimeTableRepository($this->timetableModel);
    }

    /**
     * @test
     *
     * @covers ::findByRange
     */
    public function find_by_range()
    {
        $start = Carbon::create(2000, 1, 1, 1, 1, 1);
        $end   = Carbon::create(2000, 1, 30, 1, 1, 1);

        $builder = m::mock(Builder::class);
        $builder->shouldReceive('get')
            ->once()
            ->andReturn(new Collection([]));

        $this->timetableModel
            ->shouldReceive('whereBetween')
            ->once()
            ->with('date', [
                Carbon::create(2000, 1, 1, 0, 0, 0),
                Carbon::create(2000, 1, 30, 24, 56, 56),
            ])
            ->andReturn($builder);

        $this->assertEquals(
            new Collection([]),
            $this->timetableRepo->findByRange($start, $end)
        );
    }

    /**
     * @test
     *
     * @covers ::update
     */
    public function update()
    {
        $date  = Carbon::create(2000, 1, 1, 1, 1, 1);
        $field = 'single_room_price';
        $value = 200;

        $timetableRepo = $this->getMockBuilder(TimeTableRepository::class)
            ->setConstructorArgs([
                $this->timetableModel,
            ])
            ->setMethods(['updateFromArray'])
            ->getMock();

        $timetableRepo->expects($this->once())
            ->method('updateFromArray')
            ->with($date, [$field => $value])
            ->willReturn(null);

        $this->assertNull($timetableRepo->update($date, $field, $value));
    }

    /**
     * @test
     *
     * @covers ::bulkUpdate
     */
    public function bulk_update()
    {
        $start                = Carbon::create(2000, 1, 1, 1, 1, 1);
        $end                  = Carbon::create(2000, 1, 2, 1, 1, 1);
        $changePriceTo        = 5000;
        $changeAvailibilityTo = 5;
        $roomType             = 'single';

        $daysOfWeek = [
            'sunday' => '1',
            'monday' => '1',
            'tuesday' => '1',
            'wednesday' => '1',
            'thursday' => '1',
            'friday' => '1',
            'saturday' => '1',
        ];

        $timetableRepo = $this->getMockBuilder(TimeTableRepository::class)
            ->setConstructorArgs([
                $this->timetableModel,
            ])
            ->setMethods(['mapDayOfWeek', 'updateFromArray'])
            ->getMock();

        $timetableRepo->expects($this->exactly(2))
            ->method('mapDayOfWeek')
            ->willReturn('monday');

        $timetableRepo->expects($this->exactly(2))
            ->method('updateFromArray')
            ->willReturn('monday');

        $this->assertNull($timetableRepo->bulkUpdate(
            $start,
            $end,
            $changePriceTo,
            $changeAvailibilityTo,
            $roomType,
            $daysOfWeek
        ));
    }

    /**
     * @test
     *
     * @covers ::updateFromArray
     */
    public function update_from_array_for_existed_data()
    {
        $expectDate = $date = Carbon::create(2000, 1, 1, 1, 1, 1);
        $expectDate->setTime(0, 0, 0);

        $fields = [
            'single_room_price' => 10
        ];

        $builder = m::mock(Builder::class);

        $builder->shouldReceive('count')
            ->once()
            ->andReturn(1);

        $builder->shouldReceive('update')
            ->once()
            ->with($fields)
            ->andReturn(null);

        $this->timetableModel
            ->shouldReceive('where')
            ->once()
            ->with('date', $expectDate)
            ->andReturn($builder);

        $this->assertNull(
            $this->callMethod($this->timetableRepo, 'updateFromArray', [$date, $fields])
        );
    }

    /**
     * @test
     *
     * @covers ::updateFromArray
     */
    public function update_from_array_insert_new_row()
    {
        $expectDate = $date = Carbon::create(2000, 1, 1, 1, 1, 1);
        $expectDate->setTime(0, 0, 0);

        $fields = [
            'single_room_price' => 10
        ];

        $builder = m::mock(Builder::class);

        $builder->shouldReceive('count')
            ->once()
            ->andReturn(0);

        $this->timetableModel
            ->shouldReceive('where')
            ->once()
            ->with('date', $expectDate)
            ->andReturn($builder);

        $newInstanceModel = m::mock(TimeTable::class);

        $newInstanceModel->shouldReceive('setAttribute')
            ->twice()
            ->andReturnNull();

        $newInstanceModel->shouldReceive('save')
            ->andReturnNull();

        $this->timetableModel
            ->shouldReceive('newInstance')
            ->once()
            ->andReturn($newInstanceModel);

        $this->assertNull(
            $this->callMethod($this->timetableRepo, 'updateFromArray', [$date, $fields])
        );
    }

    /**
     * @test
     *
     * @covers ::mapDayOfWeek
     * @dataProvider map_day_of_week_provider
     */
    public function map_day_of_week($input, $output)
    {
        $date = Carbon::create(2016, 10, 2, 1, 1, 1);

        $date->addDay($input);

        $this->assertEquals(
            $output,
            $this->callMethod($this->timetableRepo, 'mapDayOfWeek', [$date])
        );
    }

    /**
     * @return array
     */
    public function map_day_of_week_provider()
    {
        return [
            [
                Carbon::SUNDAY,
                'sunday',
            ],
            [
                Carbon::MONDAY,
                'monday',
            ],
            [
                Carbon::TUESDAY,
                'tuesday',
            ],
            [
                Carbon::WEDNESDAY,
                'wednesday',
            ],
            [
                Carbon::THURSDAY,
                'thursday',
            ],
            [
                Carbon::FRIDAY,
                'friday',
            ],
            [
                Carbon::SATURDAY,
                'saturday',
            ],
        ];
    }
}
