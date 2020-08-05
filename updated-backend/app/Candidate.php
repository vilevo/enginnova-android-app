<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Candidate extends Model{

    public function candidate_participants(){
        return $this->hasMany('App\CandidateParticipant');
    }
}