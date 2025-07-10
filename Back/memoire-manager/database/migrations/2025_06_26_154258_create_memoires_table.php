<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('memoires', function (Blueprint $table) {
            $table->id();
            $table->text("libelle_theme");
            $table->text("problematique");
            $table->text("objectif_general");
            $table->text("objectif_specifique");
            $table->string("domaine");
            $table->text("resultat_attendu");
            $table->enum("etat_validation", ['En attente', 'Valide', 'Refuse'])->default('En attente');
            $table->integer("etudiant_id")->nullable();
            $table->integer("professeur_id")->nullable();
            $table->integer("tuteur_id")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('memoires');
    }
};
