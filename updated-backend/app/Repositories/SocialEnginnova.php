<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Http;


class SocialEnginnova
{

  public static $server = "https://social.enginnova.co";
  // public static $server = "http://localhost:8000";
  public $token;


  public function __construct()
  {
    $this->token = env("SOCIAL_TOKEN", null);
  }

  public function createUser($name, $email, $password)
  {
    try {
      $response = Http::retry(2, 500)->withHeaders([
        'X-Api-Authorization' => $this->token
      ])
        ->post(SocialEnginnova::$server . '/api/users/sync', [
          'name' => $name,
          'email' => $email,
          'password' =>  $password,
        ]);
      return json_decode($response->body());
    } catch (\Throwable $th) {
      dd($th);
    }
  }

  /**
   * Avoir les posts de social enginnova par page
   */
  public function getPosts($page = 1)
  {
    return $response = Http::retry(2, 500)
      ->withHeaders([
        'X-Api-Authorization' => $this->token
      ])
      ->get(SocialEnginnova::$server . '/api-posts/?page=' . $page);
  }

  /**
   * Avoir les annonce de social enginnova par page
   */
  public function getAnnonces($page = 1)
  {
    return $response = Http::retry(2, 500)
      ->withHeaders([
        'X-Api-Authorization' => $this->token
      ])
      ->get(SocialEnginnova::$server . '/api-jobs/?page=' . $page);
  }


  /**
   * Effectuer des recherches de posts sur ....
   */
  public function getSearchPosts($toSearch, $limit = 50)
  {
    return $response = Http::retry(2, 500)
      ->withHeaders([
        'X-Api-Authorization' => $this->token
      ])
      ->post(SocialEnginnova::$server . '/api/posts/search', [
        'value' => $toSearch,
        'limit' => $limit
      ]);
  }


  /**
   * REchercher les annonces sur
   */
  public function getSearchAnnonces($toSearch, $limit = 50)
  {
    return $response = Http::retry(7, 500)
      ->withHeaders([
        'X-Api-Authorization' => $this->token
      ])
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
