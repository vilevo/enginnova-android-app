<?php

namespace App\Http\Controllers;

use App\Partner;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Participant;
use App\Repositories\SocialEnginnova;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{

    public function index(Request $request, SocialEnginnova $socialEnginnova)
    {
        
        $rep = json_decode($socialEnginnova->getPosts(1)->body());
        $rep->posts = collect($rep->posts)->map(function ($item, $index) {

            // $item->avatar =  Storage::temporaryUrl($item->avatar, now()->addMinutes(5));

            return $item;
        });
        return response()->json($rep);
    }


    public function search(Request $request, SocialEnginnova $socialEnginnova)
    {
        return $socialEnginnova->getSearchPosts($request->search)->body();
    }
}
