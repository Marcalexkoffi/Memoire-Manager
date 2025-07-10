<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Memoire extends Model
{
    use HasFactory;


    protected $fillable = [
        'libelle_theme',
        'problematique',
        'objectif_general',
        'objectif_specifique',
        'domaine',
        'resultat_attendu',
        'etat_validation',
        'professeur_id',
        'tuteur_id',
        'etudiant_id',
    ];
    
    public function users() {
        return $this->belongsTo(User::class);
    }


}
