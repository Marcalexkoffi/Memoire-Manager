<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Types de donnees incorrects ou donnees manquantes."
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        $remember = $request->rememberMe;

        if ($user) {
            $isValidPassword = password_verify($request->input('password'), $user->password);

            if ($isValidPassword) {
                return response()->json([
                    "message" => "Utilisateur connecte",
                    "token" => $user->createToken(
                        'API TOKEN',
                        ['*'],
                        now()->addHours(
                            $remember ? 24 : 3
                        )
                    )->plainTextToken,
                    "user" => $user
                ], 200);
            }

            return response()->json(['message' => "Mot de passe ou email incorrect"], 409);
        }

        return response()->json(['message' => 'Aucun utilisateur trouve'], 404);
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'nom_complet' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6',
                'contact' => 'required|string|min:10',
                'role' => 'in:Etudiant,Professeur,Tuteur',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Types de donnees incorrects ou donnees manquantes."
            ], 422);
        }

        $user = User::create([
            'nom_complet' => $request->nom_complet,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'contact' => $request->contact,
            'role' => $request->role,
        ]);

        if ($user)
            return response()->json([
                'message' => 'Utilisateur cree avec succes !',
            ], 201);

        return response()->json(['message' => "Impossible de creer l'utilisateur !"], 400);
    }

    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => "Utilisateur deconnecte avec succes"], 200);
    }
}
