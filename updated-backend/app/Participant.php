<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Musonza\Chat\Traits\Messageable;

class Participant extends Model
{

    use Messageable;


    protected $fillable = [
        'last_name', 'first_name', 'email', 'username', 'biography',
        'quarter', 'job', 'enterprise', 'phone_number', 'website',
        'linkedin', 'facebook', 'twitter', 'birth_date', 'enginnova_token', 'enginnova_token_created_at', 'email_verified_at'
    ];

    /**
     * The competencies that belong to the Participant
     */
    public function competencies()
    {
        return $this->belongsToMany(
            "App\Competency",
            "competencies_participants",
            "participant_id",
            "competency_id"
        );
    }

    /**
     * The interests that belong to the Participant
     */
    public function interests()
    {
        return $this->belongsToMany(
            "App\Interest",
            "interests_participants",
            "participant_id",
            "interest_id"
        );
    }

    public static function addCompetenciesToParticipant($participant, $competency_content)
    {

        // Test if $competence already exists
        $competency = Competency::where('content', $competency_content)->first();

        if ($competency != null) {
            $participant->competencies()->attach($competency->id);
            return;
        }
        $competency = new Competency();
        $competency->content = $competency_content;
        $competency->save();
        $participant->competencies()->attach($competency->id);
    }

    public static function removeCompetenciesToParticipant($participant, $competency_content)
    {

        // Test if $competence already exists
        $competency = Competency::where('content', $competency_content)->first();

        if ($competency != null) {
            $participant->competencies()->detach($competency->id);
            return;
        }
    }

    public static function addInterestToParticipant($participant, $interest_content)
    {

        // Test if $interest already exists
        $interest = Interest::where('content', $interest_content)->first();

        if ($interest != null) {
            $participant->interests()->attach($interest->id);
            return;
        }
        $interest = new Interest();
        $interest->content = $interest_content;
        $interest->save();
        $participant->interests()->attach($interest->id);
    }

    public static function removeInterestToParticipant($participant, $interest_content)
    {

        // Test if $interest already exists
        $interest = Interest::where('content', $interest_content)->first();

        if ($interest != null) {
            $participant->interests()->detach($interest->id);
            return;
        }
    }

    public static function from($token) {
        return Participant::query()->where('enginnova_token', $token)->get()->first();
    }

    public function getCompetenciesAttribute()
    {
        return $this->competencies()->get(['content'])->pluck('content')->toArray();
    }

    public function getInterestsAttribute()
    {
        return  $this->interests()->get(['content'])->pluck('content')->toArray();
    }

    // protected $hidden = [''];
}
