<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Http;
use App\Participant;
use Carbon\Carbon;


class SocialEnginnova
{

  public static $server = "https://social.enginnova.co";
  public static $token = "qwertyuiopasdfghjklzcvbnm1234567890";


  public function __construct()
  {
  }

  public function createUser($email, $password)
  {
    // $response = Http::retry(7, 500)->withToken($this->token)
    //   ->post(SocialEnginnova::$server . 'sync/users', [
    //     'email' => $email,
    //     'password' =>  $password,
    //   ]);
  }

  /**
   * Avoir les posts de social enginnova par page
   */
  public function getPosts($page = 1)
  {
    return $response = Http::retry(7, 500)
      ->get(SocialEnginnova::$server . '/api-posts/?page=' . $page);
  }

  /**
   * Avoir les annonce de social enginnova par page
   */
  public function getAnnonces($page = 1)
  {
    return $response = Http::retry(7, 500)
      ->get(SocialEnginnova::$server . '/api-jobs/?page=' . $page);
  }


  /**
   * Effectuer des recherches de posts sur ....
   */
  public function getSearchPosts($toSearch)
  {
    return $response = Http::retry(7, 500)->withToken($this->token)
      ->get(SocialEnginnova::$server . '/search/posts/?q=' . $toSearch);
  }


  /**
   * REchercher les annonces sur
   */
  public function getSearchAnnonces($toSearch)
  {
    return $response = Http::retry(7, 500)->withToken($this->token)
      ->get(SocialEnginnova::$server . '/search/annonces/?page=' . $toSearch);
  }



  public static function randomString()
  {
    return \str_shuffle('qwertyuiopasdfghjklzcvbnm1234567890-by-shangeee-2020-_');
  }
}
