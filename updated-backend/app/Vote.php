<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model{

    public static $MAX_VOTES_PARTICIPANTS = 5;

    protected $fillable = ['participant_id', 'candidat_id', 'key'];

    // protected $hidden = ['participant_id', 'candidat_id', 'key'];

    public static function GetVotesParticipant($id){
        return static::where('participant_id', $id)
        ->count();
    }

    /**
     * Test if a vote exists
     * 
     * 
     * @return Boolean
     */
    public static function IsVoteExists($participant_id, $candidat_id){
        return static::where('participant_id', $participant_id)
                    ->where('candidat_id', $candidat_id)
                    ->exists();
    }

    public static function AddVote($participant_id, $key, $candidat_id){
        $vote = new Vote();
        
        $vote->participant_id = $participant_id;
        $vote->candidat_id = $candidat_id;
        $vote->key = $key;
        
        $vote->save();
        return true;
    }

    public static function RemoveVote($participant_id, $candidat_id){
        return static::where('participant_id', $participant_id)
                ->where('candidat_id', $candidat_id)->first(); 

        // $vote->delete();

        // return $vote;
    }

    public static function GetVotesCandidat($id){
        return static::where('candidat_id', $id)
        ->count();
    }

    public static function GetVotesByCandidat(){
        static::groupBy('candidat_id')->selectRaw('candidat_id, Count(*) as total')
        ->get();
    }

}