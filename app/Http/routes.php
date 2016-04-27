<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});





Route::group(['middleware' => 'web'], function () {

    //show login page
    Route::get('signin', 'PageController@showLogin');

    //hande login
    Route::post('signin','PageController@handleLogin');

    //handle logout
    Route::get('logout', 'PageController@handleLogout');

    Route::group(['middleware'=>'auth'],function(){

        //basic Google Map
        Route::get('map', 'HomeController@showUserMap');
        //Google Map wth dynamic address
        Route::get('map2', 'HomeController@showUserMap2');
        //Googlee Map with search box
        Route::get('map3', 'HomeController@showUserMap3');
        //Google Map with multi markers
        Route::get('map4', 'HomeController@showUserMap4');
        //Google Map with markers and markers click popup
        Route::get('map5', 'HomeController@showUserMap5');
        //Google Map with Preloader
        Route::get('map6', 'HomeController@showUserMap6');
        //Google Map with onther Preloader
        Route::get('map7', 'HomeController@showUserMap7');
        //Goole Map to get current location
        Route::get('map8','HomeController@showUserMap8');
        Route::post('store-location','HomeController@storeLocation');

        //Google Map search based on DB
        Route::get('map9','HomeController@showUserMap9');
        Route::post('affiliate-locations','HomeController@getNearbyAffiliates');

        //Google Map with customize search box
        Route::get('map10','HomeController@showUserMap10');

        //show distance calculate page
        Route::get('distance','HomeController@showDistanceCalculator');
        //calculate the distance
        Route::get('distance-calculator','HomeController@calculateDistance');

        Route::get('map-component', 'HomeController@showUserMapComponent');
        Route::get('vue-test', 'HomeController@showVue');
        Route::get('json', 'HomeController@showJsonPage');
        Route::post('geo-data', 'HomeController@handleGeodata');

    });
});


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});
