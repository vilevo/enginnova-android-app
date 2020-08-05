<?php

namespace App\Http\Controllers;

use App\Competency;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class CompetencyController extends Controller
{
    public function index(){
        $competencies = Competency::paginate(15);

        return $competencies;
    }
    
    public function list($value){
        
        if($value==null){
            return Competency::get(['content'])->pluck('content')->toArray();
        }
        return Competency::where('content', 'LIKE', $value.'%')->get(['content'])->pluck('content')->toArray();
    }
    
    


    public function show($id){
        $competency = Competency::find($id);

        if($competency == null){
            return [
                'error' => true,
                'competency' => $competency,
                'message' => ['La compétence n\'existe pas']
            ];
        }

        return [
            'error' => false,
            'competency' => $competency
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

        $competency = new Competency();
        $competency->content = $request->input('content');

        $competency->save();

        return [
            'error' => false,
            'competency' => $competency
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

        $competency = Competency::find($id);
        $competency->content = $request->input('content');

        $competency->save();

        return [
            'error' => false,
            'competency' => $competency
        ];
    }

    public function delete($id){
        $competency = Competency::find($id);

        if($competency==null){
            return [
                'error' => true,
                'message' => ['La compétence n\'existe pas']
            ];
        }

        $competency->delete();

        return [
            'error' => false,
            'competency' => $competency
        ];
    }
}