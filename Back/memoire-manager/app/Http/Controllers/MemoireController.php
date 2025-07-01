<?php

namespace App\Http\Controllers;

use App\Models\Memoire;
use App\Models\User;
use Illuminate\Http\Request;

class MemoireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function store(Request $request)
    {

        $memoire = Memoire::create([
            'libelle_theme' => $request->libelle_theme,
            'problematique' => $request->problematique,
            'objectif_general' => $request->objectif_general,
            'objectif_specifique' => $request->objectif_specifique,
            'resultat_attendu' => $request->resultat_attendu,
            'etat_validation' => $request->etat_validation,
            'etudiant_id' => $request->etudiant_id,
        ]);

        if($memoire)
            return response()->json("Formulaire soumis avec succes !");
            
        return response()->json("Erreur de soumission");

    }

}
