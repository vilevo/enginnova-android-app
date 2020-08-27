<?php

namespace App\Http\Controllers;

use App\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Participant;
use App\Repositories\SocialEnginnova;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class AnnonceController extends Controller
{

    public function index(Request $request, SocialEnginnova $socialEnginnova)
    {

        $rep = json_decode($socialEnginnova->getAnnonces(1)->body());
        $rep->freelance_projets = collect($rep->freelance_projets)->map(function ($item, $index) {

            $item->avatar =  Storage::temporaryUrl($item->avatar, now()->addMinutes(5));

            return $item;
        });
        return response()->json($rep);
    }


    public function search(Request $request, SocialEnginnova $socialEnginnova)
    {
        return $socialEnginnova->getSearchAnnonces('dallas')->body();
    }
}
