/**
 * Created by Junjie on 25/01/2016.
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

                //if the return results are avaiable, show the first one on the map
                if(status === google.maps.GeocoderStatus.OK){

                    vm.map.setZoom(15);
                    vm.map.setCenter(results[0].geometry.location);

                    //initialize random markers neary research
                    // add makers near search results
                    var iconBase = 'images/'; //maker image
                    for (i = 0; i < 10; i++) {
                        marker = new google.maps.Marker({
                            icon: iconBase + 'female.png',
                            position: new google.maps.LatLng(results[0].geometry.location.lat()*getRandomArbitrary(0.9998,1),
                                results[0].geometry.location.lng()*getRandomArbitrary(0.9998,1)),
                            map:vm.map

                        });}

                    //build a maker for the map
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

