<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request) {
        $user = User::where('email', $request->email)->first();

        if($user) {
            $test = password_verify($request->password, $user->password);
            if($test)
                return response()->json(["message" => "Utilisateur trouve"]);
        } 
        return response()->json(['message' => 'Aucun utilisateur trouve']);
    }

    public function register(Request $request) {
        
        $request->validate([
            'nom_complet' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'contact' => 'required|string|min:10',
            'role' => 'required|string',
        ]);

        $list = [
            'nom_complet' => $request->nom_complet,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'contact' => $request->contact,
            'role' => $request->role,
        ];

        $user = User::create($list);

        if($user)
            return response()->json(['message' => 'Utilisateur cree avec succes !']);

        return response()->json(['message' => "Impossible de creer l'utilisateur !"]);
        
    }
    
}
