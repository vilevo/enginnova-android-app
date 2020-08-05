<?php

namespace App\Http\Controllers;

use App\CandidateParticipant;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class CandidateParticipantController extends Controller
{
    public function index(){
        $candidate_participants = CandidateParticipant::paginate(15);

        return $candidate_participants;
    }

    public function show($id){
        $candidate_participant = CandidateParticipant::find($id);

        if($candidate == null){
            return [
                'error' => true,
                'candidate_participant' => $candidate_participant,
                'message' => ['Le candidat n\'existe pas']
            ];
        }

        return [
            'error' => false,
            'candidate_participant' => $candidate_participant
        ];
    }

    public function create(Request $request){
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

        $candidate = new CandidateParticipant();
        $candidate->last_name = $request->input('last_name');
        $candidate->first_name = $request->input('first_name');
        $candidate->status = $request->input('status');
        $candidate->candidate_id = $request->input('candidate_id');
        $candidate->gender = $request->input('gender');

        $candidate->save();

        return [
            'error' => false,
            'candidate_participant' => $candidate
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

        $candidate = CandidateParticipant::find($id);
        
        if($candidate==null){
            return [
                'error' => false,
                'message' => ['Le candidat n\'existe pas pour le supprimer.']
            ];
        }

        $candidate->last_name = $request->input('last_name');
        $candidate->first_name = $request->input('first_name');
        $candidate->status = $request->input('status');
        $candidate->gender = $request->input('gender');
        $candidate->candidate_id = $request->input('candidate_id');

        $candidate->save();

        return [
            'error' => false,
            'candidate_participant' => $candidate
        ];
    }

    public function delete($id){
        $candidate = CandidateParticipant::find($id);

        if($candidate==null){
            return [
                'error' => true,
                'message' => ['Le candidat n\'existe pas']
            ];
        }

        $candidate->delete();

        return [
            'error' => false,
            'candidate' => $candidate
        ];
    }
}