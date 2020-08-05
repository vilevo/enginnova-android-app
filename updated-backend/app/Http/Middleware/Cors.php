<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\StreamedResponse;
class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $headers = [
            'Access-Control-Allow-Origin'      => 'http://localhost:4200',
            'Access-Control-Allow-Methods'     => 'OPTIONS, POST, GET, PUT, DELETE',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Max-Age'           => '86400',
            'Access-Control-Allow-Headers'     => 'Access-Control-Allow-Origin, Access-Control-Allow-Headers,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
        ];
        if ($request->isMethod('OPTIONS'))
        {
            // return  Response::make("OOOOOOOOOOOOOOOOOOOOOOOOOODDDDDDDDDDDD", 200, $headers);
            return response()->json('{"method":"OPTIONS"}', 200, $headers);
        }
        $response = $next($request);
        
        
        if(!($response instanceof StreamedResponse)) {
            foreach($headers as $key => $value)
            {
                $response->header($key, $value);
            }
        }

       
        return $response;
    }
}
