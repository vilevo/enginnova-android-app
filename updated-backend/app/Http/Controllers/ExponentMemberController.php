<?php

namespace App\Http\Controllers;

use App\ExponentTeam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class ExponentMemberController extends Controller
{
    public function index(){
        $exponent_members = ExponentTeam::paginate(15);

        return $exponent_members;
    }

    public function show($id){
        $exponent_member = ExponentTeam::find($id);

        if($exponent_member == null){
            return [
                'error' => true,
                'exponent_member' => $exponent_member,
                'message' => ['Le membre n\'existe pas']
            ];
        }

        return [
            'error' => false,
            'exponent_member' => $exponent_member
        ];
    }

    public function create(Request $request){
        // validate data
        $validator = Validator::make($request->all(),[
            'last_name' => 'required',
            'status' => 'required',
            'exponent_id' => 'required|exists:candidates,id',
            'gender' => 'in:M,F'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $exponent_member = new ExponentTeam();
        $exponent_member->last_name = $request->input('last_name');
        $exponent_member->first_name = $request->input('first_name');
        $exponent_member->status = $request->input('status');
        $exponent_member->exponent_id = $request->input('exponent_id');
        $exponent_member->gender = $request->input('gender');

        $exponent_member->save();

        return [
            'error' => false,
            'exponent_member' => $exponent_member
        ];
    }

    public function edit(Request $request, $id){
        // validate data
        $validator = Validator::make($request->all(),[
            'last_name' => 'required',
            'status' => 'required',
            'candidate_id' => 'required|exists:candidates,id',
            'gender' => 'in:M,F'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $exponent_member = ExponentTeam::find($id);
        
        if($exponent_member==null){
            return [
                'error' => false,
                'message' => ['Le candidat n\'existe pas pour le supprimer.']
            ];
        }

        $exponent_member->last_name = $request->input('last_name');
        $exponent_member->first_name = $request->input('first_name');
        $exponent_member->status = $request->input('status');
        $exponent_member->gender = $request->input('gender');
        $exponent_member->exponent_id = $request->input('exponent_id');

        $exponent_member->save();

        return [
            'error' => false,
            'exponent_member' => $exponent_member
        ];
    }

    public function delete($id){
        $exponent_member = ExponentTeam::find($id);

        if($exponent_member==null){
            return [
                'error' => true,
                'message' => ['Le membre n\'existe pas']
            ];
        }

        $exponent_member->delete();

        return [
            'error' => false,
            'exponent_member' => $exponent_member
        ];
    }
}