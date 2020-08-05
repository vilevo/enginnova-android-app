<?php

namespace App\Http\Controllers;

use App\Planning;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class PlanningController extends Controller
{
    public function index(){
        $plannings = Planning::paginate(15);

        return $plannings;
    }

    public function show($id){
        $planning = Planning::find($id);

        if($planning == null){
            return [
                'error' => true,
                'planning' => $planning,
                'message' => ['Le planning n\'existe pas']
            ];
        }

        return [
            'error' => false,
            'planning' => $planning
        ];
    }

    public function create(Request $request){
        // validate data
        $validator = Validator::make($request->all(),[
            'date_begin' => 'required',
            'date_end' => 'required|after:date_begin',
            'description' => 'required'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $planning = new Planning();
        $planning->date_begin = $request->input('date_begin');
        $planning->date_end = $request->input('date_end');
        $planning->description = $request->input('description');

        $planning->save();

        return [
            'error' => false,
            'planning' => $planning
        ];
    }

    public function delete($id){
        $planning = Planning::find($id);

        if($planning==null){
            return [
                'error' => true,
                'message' => ['Le planning n\'existe pas']
            ];
        }

        $planning->delete();

        return [
            'error' => false,
            'planning' => $planning
        ];
    }

    public function between($date_begin = null, $date_end = null){
        
    }
}