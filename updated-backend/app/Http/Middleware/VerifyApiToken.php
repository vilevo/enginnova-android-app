<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use App\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerifyApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $guard = null)
    {
        $tok = $request->header('Authorization');

        if ($tok == null) {
            return response()->json([
                'error' => "Authorization Token not found"
            ], 401);
        }

        $tok = str_replace("Bearer ", "", $tok);

        $user = User::query()->where('api_token', $tok)->get()->first();

        if($user == null) {
            return response()->json([
                'error' => "Authorization Token expired"
            ], 401);
        }

        auth()->loginUsingId($user->id);

        return $next($request);
    }
}
