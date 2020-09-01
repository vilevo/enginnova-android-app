<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Http;
use App\Participant;
use Carbon\Carbon;


class SocialEnginnova
{

  public static $server = "https://social.enginnova.co";
  // public static $server = "http://localhost:8000";
  public static $token = "qwertyuiopasdfghjklzcvbnm1234567890";


  public function __construct()
  {
  }

  public function createUser($email, $password)
  {
    // $response = Http::retry(7, 500)->withToken(SocialEnginnova::$token)
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
  public function getSearchPosts($toSearch, $limit=50)
  {
    return $response = Http::retry(7, 500)->withToken(SocialEnginnova::$token)
      ->post(SocialEnginnova::$server . '/api/posts/search', [
        'value' => $toSearch,
        'limit' => $limit
      ]);
  }


  /**
   * REchercher les annonces sur
   */
  public function getSearchAnnonces($toSearch, $limit=50)
  {
    return $response = Http::retry(7, 500)->withToken(SocialEnginnova::$token)
      ->post(SocialEnginnova::$server . '/api/api-jobs/search', [
        'value' => $toSearch,
        'limit' => $limit
      ]);
  }



  public static function randomString()
  {
    return \str_shuffle('qwertyuiopasdfghjklzcvbnm1234567890-by-shangeee-2020-_');
  }
}
