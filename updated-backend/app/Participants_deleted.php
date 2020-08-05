<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participants_deleted extends Model{

    protected $fillable = ['last_name', 'email', 'username', 'biography',
                            'quarter', 'job', 'enterprise', 'phone_number'];

    protected $table = 'participants_deleted';
    public $timestamps = false;
}