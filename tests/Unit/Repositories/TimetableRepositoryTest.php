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
        $this->markTestIncomplete();
    }

    /**
     * @test
     *
     * @covers ::bulkUpdate
     */
    public function bulk_update()
    {
        $this->markTestIncomplete();
    }

    /**
     * @test
     *
     * @covers ::updateFromArray
     */
    public function update_from_array()
    {
        $this->markTestIncomplete();
    }

    /**
     * @test
     *
     * @covers ::mapDayOfWeek
     */
    public function map_day_of_week()
    {
        $this->markTestIncomplete();
    }
}
