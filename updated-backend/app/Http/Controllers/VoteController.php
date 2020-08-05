<?php

namespace App\Http\Controllers;

use App\Vote;
use App\Participant;
use App\Candidate;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class VoteController extends Controller
{
    /**
     * Display a list of votes by candidates
     *
     * @return Response
     */
    public function index()
    {
        return [
            'error' => false,
            'votes' => Vote::GetVotesByCandidat()
        ];
    }

    public function showVoteForCandidat($id){
        $vote = Vote::where('candidat_id', $id)->count();

        return [
            'candidat_id' => $id,
            'votes' => $vote
        ];
    }

    /**
     * Add Vote
     * 
     * @return Response
     */
    public function AddVote(Request $request){

        // validate data
        $validator = Validator::make($request->all(),[
            'participant_key' => 'required|exists:participants,key',
            'candidate_id' => 'required|exists:candidates,id'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }
        $participant = Participant::where('key', $request->input('participant_key'))->first();
        $candidat = Candidate::find($request->input('candidate_id'));
        
        // test if participant attempt MAX votes
        if(Vote::IsVoteExists($participant->id, $candidat->id)){
            return [
                    'error' => true,
                    'message' => $participant->username.' a déjà voté pour le projet du candidat '.$candidat->name
                ];
        }

        $vote = new Vote();
        
        $vote->candidat_id = $candidat->id;
        $vote->participant_id = $participant->id;
        $vote->participant_key = $participant->key;
        
        $vote->save();

        return [
            'error' => false,
            'candidate' => $candidat,
            'vote' => Vote::GetVotesCandidat($candidat->id)
        ];
    }

    /**
     * Add Vote
     * 
     * @return Response
     */
    public function RemoveVote(Request $request){

        // validate data
        $validator = Validator::make($request->all(),[
            'participant_key' => 'exists:participants,key',
            'candidate_id' => 'exists:candidates,id'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }
        $participant = Participant::where('key', $request->input('participant_key'))->first();
        $candidat = Candidate::find($request->input('candidate_id'));
        
        // test if participant attempt MAX votes
        if(!Vote::IsVoteExists($participant->id, $candidat->id)){
            return [
                    'error' => true,
                    'message' => $participant->username.' n\'a jamais voté pour le projet du candidat '.$candidat->name
                ];
        }

        $vote = Vote::where('participant_id', $participant->id)
                ->where('candidat_id', $candidat->id)->first();
        
        if($vote!=null){
            $vote->delete();
        }
        
        // return Vote::RemoveVote($participant->id, $participant->key, $candidat->id);

        return [
            'error' => false,
            'candidate' => $candidat,
            'vote' => Vote::GetVotesCandidat($candidat->id)
        ];
    }

}