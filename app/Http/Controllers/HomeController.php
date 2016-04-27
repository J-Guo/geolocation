<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
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

    public function showUserMap9(){
        return view('map9');
    }

    public function showUserMap10(){
        return view('map10');
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

    public function showDistanceCalculator(){

        return view('distance');
    }

    //calculate the distance between two points
    public function calculateDistance(Request $request){

        $fromLat = $request->input('fromLat');
        $fromLon = $request->input('fromLon');

        $toLat = $request->input('toLat');
        $toLon = $request->input('toLon');

        $theta = $fromLon  - $toLon;
        $dist = sin(deg2rad($fromLat)) * sin(deg2rad($toLat)) +  cos(deg2rad($fromLat)) * cos(deg2rad($toLat)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;

        //get meters
        $meters = $miles * 1.609344 * 1000;

        return $meters;

    }

    //get locations from DB
    public function getNearbyAffiliates(Request $request){

        /*
         * Find the affiliate locations based on user current location
         * and radians distance (km)
         */
        $lat = $request->input('latitude');
        $lng = $request->input('longitude');

        $locations =
            DB::table('locations')
            ->select(DB::raw("*, (6371 * acos( cos( radians($lat) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians($lng) ) + sin( radians($lat ) ) * sin( radians( latitude ) ) ) ) AS distance"))
            ->having('distance', '<', 10) //radius distance (km)
            ->orderBy('distance')
            ->limit(25) //the the number of research results
            ->get();

        return response()->json($locations);

    }

}
