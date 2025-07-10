<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Memoire>
 */
class MemoireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $domaine = ['Marketing', 'Administration', 'Informatique', 'Communication', 'Finance'];

        return [
            'libelle_theme' => fake()->sentence(3),
            'problematique' => fake()->sentence(6),
            'objectif_general' => fake()->paragraph(2),
            'objectif_specifique' => fake()->paragraph(2),
            'domaine' => $domaine[random_int(0, count($domaine)-1)],
            'resultat_attendu' => fake()->sentence(),
        ];
    }
}
