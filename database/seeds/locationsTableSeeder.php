<?php

use Illuminate\Database\Seeder;
use App\models\Location;

class locationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        for($i=0; $i<100; $i++){

            $location = new Location();
            $location->latitude = -33.876173+$this->getRandomArbitrary(-0.2,0.2);
            $location->longitude = 151.209859+$this->getRandomArbitrary(-0.2,0.2);

            $location->save();

        }



    }

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    public function getRandomArbitrary($min, $max) {

        return $min + lcg_value()*(abs($max - $min));

    }
}
