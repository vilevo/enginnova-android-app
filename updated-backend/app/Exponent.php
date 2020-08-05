<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exponent extends Model{

    public function exponent_members(){
        return $this->hasMany('App\ExponentTeam');
    }
}