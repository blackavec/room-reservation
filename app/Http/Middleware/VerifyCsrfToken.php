<?php

namespace App\Http\Middleware;

class VerifyCsrfToken
{
    public function handle($request, $next)
    {
        return $next($request);
    }
}
