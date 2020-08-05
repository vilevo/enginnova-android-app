<?php

use App\Competency;
use App\Interest;
use App\Participant;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        echo "Start custom data\n";
        $faker = Faker::create('fr_FR');
        // $this->call('UsersTableSeeder');

        $listCompetencies = [
            'Avocat', 'Developpeur', 'Comptabible', 'Medecin', 'Sociologue', 'Geographe', 'Administrateur de base de donnee', 'Mecanicien', 'Electricien',
        ];
        echo "Participants and interests\n";
        foreach (range(0,150) as $value) {
            Competency::create([
                'content' => $faker->jobTitle()
            ]);
            Interest::create([
                'content' => $faker->jobTitle()
            ]);
        }

        $allC = Competency::all(['id']);
        $allI = Interest::all(['id']);

        // Create participants
        echo "Controlled participant\n";
        Participant::create([
            'last_name' => 'Ange',
            'first_name' => 'Amenou', 
            'email' => 'fourange@gmail.com', 
            'username' => 'user1', 
            // 'biography',
            'quarter' => 'Lome', 
            'job' => 'Job', 
            'enterprise' => 'enterprise', 
            'phone_number' => '90334435', 
            // 'website',
            // 'linkedin',
            // 'facebook',
            // 'twitter',
            // 'birth_date',
            // 'image'
        ]);

        echo "Other participants\n";

        foreach (range(0, 500) as $key => $value) {
            $p = Participant::create([
                'last_name' => $faker->lastName(),
                'first_name' => $faker->firstName(), 
                'email' => $faker->email(), 
                'username' => $faker->text(30), 
                // 'biography',
                'quarter' => $faker->city(), 
                'job' => $faker->jobTitle(), 
                'enterprise' => $faker->company(), 
                'phone_number' => '90334435', 
                // 'website',
                // 'linkedin',
                // 'facebook',
                // 'twitter',
                // 'birth_date',
                // 'image'
            ]); 

            $p->competencies()->attach($allC->random(1)[0]);
            $p->interests()->attach($allI->random(1)[0]);
        }
    
    }
}
