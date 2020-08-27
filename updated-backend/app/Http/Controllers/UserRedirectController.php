<?php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Participant;
use App\Repositories\SocialEnginnova;
use Illuminate\Http\Request;

class UserRedirectController extends Controller
{

  /**
   * Redirect too a post o social enginnova
   */
  public function redirectPost(Request $request)
  {

    $user = Participant::find($request->user_id);

    if ($user) {

      return response()->json([
        'link' => SocialEnginnova::$server . "/user/question/" . $request->id . "?token=" . $user->enginnova_token
      ]);
    }

    return response()->json([
      'error' => "This user does not exists"
    ], 404);
  }

  /**
   * Redirect to an annonce on social enginnova
   */
  public function redirectAnnonce(Request $request)
  {
    $user = Participant::find($request->user_id);
    if ($user) {

      return response()->json([
        'link' => SocialEnginnova::$server . "/user/freelance-projet/" . $request->id . "?token=" . $user->enginnova_token
      ]);
    }

    return response()->json([
      'error' => "This user does not exists"
    ], 404);
  }

  /**
   * Show a participant profil on social enginnoova
   */
  public function redirectShowParticipant(Request $request)
  {

    $user = Participant::find($request->from);

    if ($user) {

      if ($request->has('to')) {
        return response()->json([
          'link' => SocialEnginnova::$server . "/participants?show=" . $request->to . "?token=" . $user->enginnova_token
        ]);
      }
      return response()->json([
        'link' => SocialEnginnova::$server . "/participants?show=" . $user->enginnova_token . "?token=" . $user->enginnova_token
      ]);
    }

    return response()->json([
      'error' => "This user does not exists"
    ], 404);
  }
}
