<?php

use App\Http\Controllers\Controller;
use App\Participant;
use Illuminate\Http\Request;

class UserSynchronisationController extends Controller
{

  /**
   * Creation d'un utilisateur
   */
  public function syncCreate(Request $request)
  {
    $validatedData = $request->validate([
      'email' => 'required',
      'password' => 'required',
      'token' => 'required'
    ]);

    // Social enginnova veux creer un utilisateur dans l'application
    // 

    // On genere un uuid
    // On crrer utilisateur 
    $participant = Participant::create([
      'email' => $validatedData['email'],
      'password' => $validatedData['password'],
      'enginnova_token' => $validatedData['token'],
      'enginnova_token_created_at' => now()
    ]);


    // On retourne l'id creer
    return response()->json([
      'error' => false
    ]);
  }

  /**
   * Synchronisation de la mise a jour d'un champ
   */
  public function syncUpdate(Request $request)
  {
    // Social enginnova veux mettre a jour  un utilisateur dans l'application
    // On recherche l'utilisateur a l'aide du uuid

    // On met a jour les champs a metre ajour

    return [
      "ok"
    ];
  }


  /**
   * L'utilisateur vient de confirmer son adresse mail
   */
  public function syncEmailConfirmed(Request $request)
  {
    $validatedData = $request->validate([
      'token' => 'required',
      'date' => 'required'
    ]);

    $user = Participant::query()->where('enginnova_token', $validatedData['token'])
      ->get()->first();
    if ($user) {
      $user->email_confirmed_at = $validatedData['date'];
      $user->save();
    }

    return response()->json([
      'error' => 'false'
    ]);
  }
}
