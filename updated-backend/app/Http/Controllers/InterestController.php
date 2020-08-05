<?php

namespace App\Http\Controllers;

use App\Interest;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class InterestController extends Controller
{
    public function index(){
        $interests = Interest::paginate(15);

        return $interests;
    }
    
    public function list($value){
        
        if($value==null){
            return Interest::get(['content'])->pluck('content')->toArray();
        }
        return Interest::where('content', 'LIKE', $value.'%')->get(['content'])->pluck('content')->toArray();
    }
    

    public function show($id){
        $interest = Interest::find($id);

        if($interest == null){
            return [
                'error' => true,
                'interest' => $interest,
                'message' => ['La compétence n\'existe pas']
            ];
        }

        return [
            'error' => false,
            'interest' => $interest
        ];
    }

    public function create(Request $request){
        // validate data
        $validator = Validator::make($request->all(),[
            'content' => 'required'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $interest = new Interest();
        $interest->content = $request->input('content');

        $interest->save();

        return [
            'error' => false,
            'interest' => $interest
        ];
    }

    public function edit(Request $request, $id){
        // validate data
        $validator = Validator::make($request->all(),[
            'content' => 'required'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $interest = Interest::find($id);
        $interest->content = $request->input('content');

        $interest->save();

        return [
            'error' => false,
            'interest' => $interest
        ];
    }

    public function delete($id){
        $interest = Interest::find($id);

        if($interest==null){
            return [
                'error' => true,
                'message' => ['La ressource n\'existe pas']
            ];
        }

        $interest->delete();

        return [
            'error' => false,
            'interest' => $interest
        ];
    }
}