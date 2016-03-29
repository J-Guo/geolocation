/**
 * Created by Junjie on 29/03/2016.
 */

$(window).load(function() {
    $("#status").fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(400).fadeOut("slow"); // will fade out the white DIV that covers the website.
});


var app = new Vue({
    el: 'body',
    data:{
        address: ''
    },
    methods: {
        //create Google Map
        createMap: function () {

            var initialLocation;
            var sydney = new google.maps.LatLng(-33.876173,151.209859);
            var vm = this;

            // Try W3C Geolocation
            if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
                initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

                vm.map = new google.maps.Map(document.querySelector('#User-Map'),{

                    center:initialLocation,
                    zoom:12
                });

                // add maker
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
                    map:vm.map

                });

                //store user current location
                storeLocation(position.coords.latitude,position.coords.longitude);

            });
            }
            //broswer does not support Geolocation
            else{
                alert('Your Browser does not support Google Map');
                vm.map = new google.maps.Map(document.querySelector('#User-Map'),{
                    center:sydney,
                    zoom:12
                });

                // add maker
                marker = new google.maps.Marker({
                    position: sydney,
                    map:vm.map

                });
            }

        },

        //transfer address into coordinates
        locateAddress: function(){

            var geocoder = new google.maps.Geocoder();
            var vm = this;

            geocoder.geocode({address:this.address},function(results,status){
                console.log(status,results);

                //image address for info window
                var imgURL = 'images/1.jpg';
                var imgURL2 = 'images/2.jpg';
                var imgURL3 = 'images/3.jpg';
                var imgURL4 = 'images/4.jpg';

                //google map infoWindow content
                var contentPublic ='Luce Allen'+
                    '<br><img src="'+imgURL+'" style="height:50px;width:50px;">' +
                    '<img src="'+imgURL2+'" style="height:50px;width:50px;">'+
                    '<img src="'+imgURL3+'" style="height:50px;width:50px;">'+
                    '<img src="'+imgURL4+'" style="height:50px;width:50px;">'+'<br>'+
                    '<a href="#">'+
                    'Go To Her Profile!</a>';

                var contentPrivate ="Oops.Her profile is private";

                //google map infoWindow
                var infowindow = new google.maps.InfoWindow({
                    maxWidth: 200
                });

                //if the return results are avaiable, show the first one on the map
                if(status === google.maps.GeocoderStatus.OK){

                    vm.map.setZoom(15);
                    vm.map.setCenter(results[0].geometry.location);

                    var iconBase = 'images/'; //maker image
                    for (i = 0; i < 10; i++) {

                        //initialize random markers neary research
                        // add makers near search results
                        marker = new google.maps.Marker({
                            icon: iconBase + 'female.png',
                            position: new google.maps.LatLng(results[0].geometry.location.lat()*getRandomArbitrary(0.9998,1.0002),
                                results[0].geometry.location.lng()*getRandomArbitrary(0.9998,1.0002)),
                            map:vm.map

                        });

                        //build popup information for each marker
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                if(getRandomOneTwo() == 1)
                                    infowindow.setContent(contentPublic);
                                else
                                    infowindow.setContent(contentPrivate);
                                infowindow.open(vm.map, marker);
                            }
                        })(marker, i));

                    }


                    //build a search result maker for the map
                    return new google.maps.Marker({
                        map: vm.map,
                        position: results[0].geometry.location

                    })
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
