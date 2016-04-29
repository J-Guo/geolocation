/**
 * Created by Junjie on 16/02/2016.
 * Google Map with multip markers, info window and preloader
 */

// Create a marker array to hold  markers
var markers = [];

var app = new Vue({
    el: 'body',
    data:{
        address: ''
    },
    methods: {
        //create Google Map
        createMap: function () {


            //set autocomplete search box
            var input = document.getElementById('address');
            var autocomplete = new google.maps.places.Autocomplete(input);

            var initialLocation;
            //default location
            var sydney = new google.maps.LatLng(-33.876173,151.209859);
            var vm = this;

            // Try W3C Geolocation
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(position) {
                    initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

                    vm.map = new google.maps.Map(document.querySelector('#User-Map'),{

                        center:initialLocation,
                        zoom:12,
                        disableDefaultUI: true
                    });



                    // add maker
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
                        map:vm.map

                    });

                    //put mark in array
                    markers.push(marker);

                    //store user current location
                    storeLocation(position.coords.latitude,position.coords.longitude);

                    /**
                     * Show nearby affiliate information
                     */
                    //google map infoWindow
                    var infowindow = new google.maps.InfoWindow({
                        maxWidth: 200
                    });

                    //get the locations of affiliate nearby
                    var locations = getNearbyAffiliate(position.coords.latitude,
                        position.coords.longitude);

                    var iconBase = 'images/'; //maker image

                    //if affiliate location is not null
                    if(locations != null)
                        for (var i = 0; i < locations.length; i++) {

                            //initialize markers
                            //add makers near search results
                            marker = new google.maps.Marker({
                                icon: iconBase + 'female.png',
                                position: new google.maps.LatLng(locations[i]['latitude'],
                                    locations[i]['longitude']),
                                map:vm.map

                            });

                            //build popup information for each marker
                            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                                return function() {
                                    if(getRandomOneTwo() == 1)
                                        infowindow.setContent(getPublicContent(locations[i]));
                                    else
                                        infowindow.setContent(getPrivateContent());
                                    infowindow.open(vm.map, marker);
                                }
                            })(marker, i));

                            markers.push(marker);

                        }

                    /**
                     * Random Affiliate
                     */
                    for (var i = 0; i < 10; i++) {

                        //google map infoWindow content
                        var contentPrivate = '<p class="firstHead">Oops.Her profile is private</p>';


                        //initialize random markers neary research
                        // add makers near search results
                        marker = new google.maps.Marker({
                            icon: iconBase + 'female.png',
                            position: new google.maps.LatLng(position.coords.latitude*getRandomArbitrary(0.9998,1.0002),
                                position.coords.longitude*getRandomArbitrary(0.9998,1.0002)),
                            map:vm.map

                        });

                        //build popup information for each marker
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                if(getRandomOneTwo() == 1)
                                    infowindow.setContent('<p class="firstHead">'+randomName()+'</p>');
                                else
                                    infowindow.setContent(contentPrivate);
                                infowindow.open(vm.map, marker);
                            }
                        })(marker, i));

                        markers.push(marker);

                    }

                });


            }
            //broswer does not support Geolocation
            else{
                alert('Your Browser does not support Google Map');
                vm.map = new google.maps.Map(document.querySelector('#User-Map'),{
                    center:sydney,
                    zoom:12,
                    disableDefaultUI: true
                });

                // add maker
                marker = new google.maps.Marker({
                    position: sydney,
                    map:vm.map

                });

                //put mark in array
                markers.push(marker);
            }
        },

        //transfer address into coordinates
        locateAddress: function(){

            // Show full page Loading Overlay
            $("#User-Map").LoadingOverlay("show");

            // Hide it after 3 seconds
            setTimeout(function(){
                $("#User-Map").LoadingOverlay("hide");
            }, 1500);

            var geocoder = new google.maps.Geocoder();
            var vm = this;

            //clear all existed markers
            setMapOnAll(null);

            //var addressText = vm.address;
            var addressText = $('#address').val();

            geocoder.geocode({address:addressText},function(results,status){
                console.log(addressText);
                console.log(status,results);

                //image address for info window
                //var imgURL = 'images/1.jpg';
                //var imgURL2 = 'images/2.jpg';
                //var imgURL3 = 'images/3.jpg';
                //var imgURL4 = 'images/4.jpg';
                //
                ////google map infoWindow content
                //var contentPublic ='Luce Allen'+
                //    '<br><img src="'+imgURL+'" style="height:50px;width:50px;">' +
                //    '<img src="'+imgURL2+'" style="height:50px;width:50px;">'+
                //    '<img src="'+imgURL3+'" style="height:50px;width:50px;">'+
                //    '<img src="'+imgURL4+'" style="height:50px;width:50px;">'+'<br>'+
                //    '<a href="aprofile">'+
                //    'Go To Her Profile!</a>';
                //
                //var contentPrivate ="Oops.Her profile is private";

                //google map infoWindow
                var infowindow = new google.maps.InfoWindow({
                    maxWidth: 200
                });

                //if the return results are avaiable, show the first one on the map
                if(status === google.maps.GeocoderStatus.OK){

                    //get the first research result
                    var resultLocation = results[0].geometry.location;

                    vm.map.setZoom(15);
                    vm.map.setCenter(resultLocation);

                    //get the locations of affiliate nearby
                    var locations = getNearbyAffiliate(resultLocation.lat(),resultLocation.lng());

                    var iconBase = 'images/'; //maker image

                    //if affiliate location is not null
                    if(locations != null)
                        for (var i = 0; i < locations.length; i++) {

                            //initialize markers
                            //add makers near search results
                            marker = new google.maps.Marker({
                                icon: iconBase + 'female.png',
                                position: new google.maps.LatLng(locations[i]['latitude'],
                                    locations[i]['longitude']),
                                map:vm.map

                            });

                            //build popup information for each marker
                            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                                return function() {
                                    if(getRandomOneTwo() == 1)
                                        infowindow.setContent(getPublicContent(locations[i]));
                                    else
                                        infowindow.setContent(getPrivateContent());
                                    infowindow.open(vm.map, marker);
                                }
                            })(marker, i));

                            markers.push(marker);

                        }


                    /**
                     * Random Affiliate
                     */
                    for (var k = 0; k < 10; k++) {

                        //google map infoWindow content
                        var myContentPrivate = '<p class="firstHead">Oops.Her profile is private</p>';

                        //initialize random markers neary research
                        // add makers near search results
                        marker = new google.maps.Marker({
                            icon: iconBase + 'female.png',
                            position: new google.maps.LatLng(resultLocation.lat()*getRandomArbitrary(0.9998,1.0002),
                                resultLocation.lng()*getRandomArbitrary(0.9998,1.0002)),
                            map:vm.map

                        });

                        //build popup information for each marker
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                if(getRandomOneTwo() == 1)
                                    infowindow.setContent('<p class="firstHead">'+randomName()+'</p>');
                                else
                                    infowindow.setContent(myContentPrivate);
                                infowindow.open(vm.map, marker);
                            }
                        })(marker, i));

                        markers.push(marker);

                    }



                    //build a search result maker for the map
                    var marker = new google.maps.Marker({
                        map: vm.map,
                        position: resultLocation

                    });

                    markers.push(marker);

                    return marker
                }
                else{
                    alert('Oops, Had troulbe to track this address, Please try again');}

            });
        }
    }
});


/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {


    return Math.random() * (max - min) + min;

}

/**
 * Get info window content for public user
 */
function getPublicContent(affiliate){

    var imgURL = "avatars/"+affiliate['profile_photo'];
    var displayName = affiliate['display_name'];

    //google map infoWindow content
    var contentPublic ='<p class="firstHead">'+displayName+'</p>'+
        '<br><img src="'+imgURL+'" style="height:100px;width:100px;">'+'<br>';

    return contentPublic;

}

/**
 * Generate info window content for private user
 */
function getPrivateContent(){
    var contentPrivate = '<p class="firstHead">Oops.Her profile is private</p>';
    return contentPrivate;
}

/**
 * Generate a random Name
 */
function randomName(){

    var names = ['Aida','Kaya','Elsa','Jula','Lila','Paulina','Rayne','Shelly',
        'Sorrel','Tilly','Marybeth','Lulu','Hetty','Eva','Ginny','Dinah','Claire',
        'Betsy','Lucy','Lina'];

    return names[Math.floor(Math.random()*20)];

}

/**
 * Returns a random 0 or 1
 */
function getRandomOneTwo(){

    return Math.floor(Math.random()*10)%2;

}

/**
 * store user current location
 */
function storeLocation(lati,longit){

    // CSRF protection
    $.ajaxSetup(
        {
            headers:
            {
                'X-CSRF-Token': $('input[name="_token"]').val()
            }
        });

    $.ajax({
        url: 'store-location',
        type: 'POST',
        dataType: 'JSON',
        data:{latitude:lati,longitude:longit}

    });

}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

//get affiliates locations based on user research
function getNearbyAffiliate(lat,lng){

    var results = null;

    // CSRF protection
    $.ajaxSetup(
        {
            headers:
            {
                'X-CSRF-Token': $('input[name="_token"]').val()
            }
        });

    $.ajax({
        url: 'affiliate-locations',
        type: 'POST',
        async: false,
        dataType: 'JSON',
        data:{latitude:lat,longitude:lng},
        success: function (data) {
            return  results =  data;
        }
    });

    return results;
}