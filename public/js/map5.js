/**
 * Created by Junjie on 15/02/2016.
 * Google Map with multip markers, info window
 */


var app = new Vue({
    el: 'body',
    data:{
        address: ''
    },
    methods: {
        //create Google Map
        createMap: function () {
            this.map = new google.maps.Map(document.querySelector('#User-Map'),{

                center:{lat:-33.876173,lng:151.209859},
                zoom:12
            });
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

