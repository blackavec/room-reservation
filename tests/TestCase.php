<?php

namespace App\Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use ReflectionClass;

abstract class TestCase extends BaseTestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * Helper function to call protected method
     *
     * @param $object
     * @param string $methodName
     * @param array[] $args
     *
     * @return mixed
     */
    protected function callMethod($object, string $methodName, array $args = [])
    {
        $class  = new ReflectionClass($object);
        $method = $class->getMethod($methodName);

        $method->setAccessible(true);

        return $method->invokeArgs($object, $args);
    }
}
