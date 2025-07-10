<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    
    public function professeur()
    {
        return $this->belongsTo(User::class, 'professeur_id');
    }
    
    public function tuteur()
    {
        return $this->belongsTo(User::class, 'tuteur_id');
    }
    
    public function etudiant()
    {
        return $this->belongsTo(User::class, 'etudiant_id');
    }


}
