<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request) {
        $user = User::where('email', $request->email)->first();
        dd($user);
        if($user) {
            $test = password_verify($request->email, $user->email);

            if($test)
                return ['message' => 'Utilisateur trouve'];
        } 
        return ['message' => 'Aucun utilisateur trouve'];
    }
}
