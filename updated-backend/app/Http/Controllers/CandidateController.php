<?php

namespace App\Http\Controllers;

use App\Candidate;
use App\CustomCandidate;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class CandidateController extends Controller
{
    public function index(){
        $candidates = Candidate::paginate(15);

        return $candidates;
    }

    public function show($id){
        $candidate = Candidate::find($id);

        if($candidate == null){
            return [
                'error' => true,
                'candidate' => $candidate,
                'message' => ['Le groupe de candidat n\'existe pas']
            ];
        }

        return [
            'error' => false,
            'candidate' => $candidate,
            'candidate_participants' => $candidate->candidate_participants()->get()
        ];
    }

    public function create(Request $request){
        // validate data
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'subject' => 'required'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $candidate = new Candidate();
        $candidate->name = $request->input('name');
        $candidate->subject = $request->input('subject');
        $candidate->description = $request->input('description');

        $candidate->save();

        return [
            'error' => false,
            'candidate' => $candidate
        ];
    }

    public function edit(Request $request, $id){
        // validate data
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'subject' => 'required'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $candidate = Candidate::find($id);
        if($candidate==null){
            return [
                'error' => true,
                'candidate' => $candidate,
                'message' => ['Le groupe de candidat n\'existe pas']
            ];
        }

        $candidate->name = $request->input('name');
        $candidate->subject = $request->input('subject');
        $candidate->description = $request->has('description')?$request->input('description'):$candidate->description;

        $candidate->save();

        return [
            'error' => false,
            'candidate' => $candidate
        ];
    }

    public function delete($id){
        $candidate = Candidate::find($id);

        if($candidate==null){
            return [
                'error' => true,
                'message' => ['Le groupe candidat n\'existe pas']
            ];
        }

        if($candidate->candidate_participants()->count()>0){
            return [
                'error' => true,
                'message' => ['Le groupe candidat contient plusieurs candidats! Veuillez supprimer d\'abord les candidats auxquels il est lié']
            ];
        }

        $candidate->delete();

        return [
            'error' => false,
            'candidate' => $candidate
        ];
    }

    public function getCandidateByVote($key){
        
        $participant_candidates_votes = \DB::table('votes')
        ->where('votes.participant_key', $key)
        ->pluck('votes.candidat_id')
        ->toArray();

        $candidates = Candidate::all();
        $result = [];

        foreach($candidates as $candidate){
            $customCandidate = new CustomCandidate();

            $customCandidate->id = $candidate->id;
            $customCandidate->name = $candidate->name;
            $customCandidate->subject = $candidate->subject;

            if(\in_array($candidate->id, $participant_candidates_votes, TRUE)){
                $customCandidate->voted = TRUE;
            }else{
                $customCandidate->voted = FALSE;
            }
 
            array_push($result, $customCandidate);
        }

        return [
            "vote" => true,
            "data" => $result
        ];
    }
}