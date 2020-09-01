<?php

namespace App\Http\Controllers;

use App\Vote;
use App\Participant;
use App\Candidate;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    function participants(Request $request)
    {
        $s = $request->search;
        $filter = DB::select("select DISTINCT * from participants where last_name LIKE '%" . $s . "%'

        and id != " . $request->participant_id . "
        
        ORDER BY (CASE WHEN last_name= '" . $s . "' THEN 1 WHEN last_name LIKE '" . $s . "%' THEN 2 ELSE 3 END)
        limit 15");
        return $filter;
    }
}
