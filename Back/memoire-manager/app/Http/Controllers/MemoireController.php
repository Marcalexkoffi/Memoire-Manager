<?php

namespace App\Http\Controllers;

use App\Http\Middleware\TokenMiddleware;
use App\Models\Memoire;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MemoireController extends Controller
{
    private function checkToken(Request $req)
    {
        $tokenMiddleware = new TokenMiddleware();
        $tokenMiddleware->handle($req);
    }

    /**
     * Display list of all elements
     */
    public function getAll(Request $request)
    {
        $this->checkToken($request);

        try {
            $memoires = Memoire::all();
            return response()->json($memoires);
        } catch (\Throwable $th) {
            response()->json(['message' => 'Erreur serveur'], 500);
        }
    }

    /**
     * Display one element
     */
    public function getOne(Request $request)
    {
        $this->checkToken($request);

        try {
            $request->validate([
                'id' => 'required|integer',
            ]);

            $memoire = Memoire::findOrFail($request->id);

            return response()->json(['data' => $memoire]);
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Types de donnees incorrects ou donnees manquantes."
            ], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Theme de memoire introuvable.'], 404);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erreur serveur'], 500);
        }
    }

    /**
     * Store new memoire.
     */
    public function store(Request $request)
    {
        $this->checkToken($request);

        try {

            $request->validate([
                'libelle_theme' => 'required|string|max:255',
                'problematique' => 'required|string',
                'domaine' => 'required|string',
                'objectif_general' => 'required|string',
                'objectif_specifique' => 'required|string',
                'resultat_attendu' => 'required|string',
                //'etat_validation' => 'in:en attente,valide,rejete',
                // 'etudiant_id' => 'required|exists:users,id',
                // 'professeur_id' => 'nullable|exists:users,id',
                // 'tuteur_id' => 'nullable|exists:users,id',
            ]);

            $student = $request->user();
            
            $memoire = Memoire::create([
                'libelle_theme' => $request->libelle_theme,
                'problematique' => $request->problematique,
                'domaine' => $request->domaine,
                'objectif_general' => $request->objectif_general,
                'objectif_specifique' => $request->objectif_specifique,
                'resultat_attendu' => $request->resultat_attendu,
                //'etat_validation' => $request->etat_validation,
                'etudiant_id' => $student->id,
            ]);

            if ($memoire)
                return response()->json("Formulaire soumis avec succes !", 201);
                
            return response()->json("Erreur de soumission", 400);
        
        } catch (ValidationException $e) {
            return response()->json([
                "message" => "Types de donnees incorrects ou donnees manquantes."
            ], 422);
        } catch (\Throwable $th) {
            return response()->json("Erreur serveur : ". $th->getMessage(), 500);
        }
    }
}
