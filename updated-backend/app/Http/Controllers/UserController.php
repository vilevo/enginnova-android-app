<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function create(Request $request){
        
        $this->validate($request, [
            'name' => 'required|unique:users|max:50',
            'password' => 'required',
            'email' => 'required|email'
        ]);

        $request['api_token'] = str_random(60);
        $request['password'] = app('hash')->make($request['password']);

        $user = new User();
        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->password = $request['password'];
        $user->api_token = $request['api_token'];

        $user->save();

        return $user;
    }

    public function token(Request $request){
        
        $this->validate($request, [
            'name' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('name', $request->input('name'))->first();

        // Compare the two passwords
        if($user==null || !Hash::check($request->input("password"), $user->password)){
            return ['error' => true, 'message' => 'Le mot de passe saisi est erroné!'];
        }

        return $user->api_token;
    }

    public function refresh(Request $request, $id){

        $this->validate($request, [
            'name' => 'required',
            'password' => 'required'
        ]);

        $user = User::findOrFail($id);

        if(!Hash::check($request->input("password"), $user->password)){
        
            return ['error' => true, 'message' => 'Le mot de passe saisi est erroné!'];
        }

        $request['api_token'] = str_random(60);

        $user->api_token = $request['api_token'];

        return $user;
    }
}