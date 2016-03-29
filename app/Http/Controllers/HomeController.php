<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use App\models\Location;

use Auth;

class HomeController extends Controller
{


    public function  showUserMap(){

        return view('map');
    }

    public function  showUserMap2(){

        return view('map2');
    }

    public function  showUserMap3(){

        return view('map3');
    }

    public function  showUserMap4(){

        return view('map4');
    }

    public function  showUserMap5(){

        return view('map5');
    }

    public function  showUserMap6(){

        return view('map6');
    }

    public function  showUserMap7(){

        return view('map7');
    }

    public function showUserMap8(){
        return view('map8');
    }

    public function  showUserMapComponent(){

        return view('map-component');
    }

    public function showVue(){
        return view('vue-test');
    }

    public function showJsonPage(){
        return view('json');
    }

    public function handleGeodata(){

        return response()->json(['latitude' => -37.764152, 'longitude' => 145.008062]);
    }

    public function storeLocation(Request $request){

        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');

        $location = new Location();
        $location->latitude = $latitude;
        $location->longitude = $longitude;
        $location->save();

    }

}
