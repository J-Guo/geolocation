/**
 * Created by Eric.G on 13/01/2016.
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

                //build a maker for the map
                return new google.maps.Marker({
                  map: vm.map,
                  position: results[0].geometry.location

                })
                }
                alert('Oops, Had troulbe to track this address, Please try again');

            });
        }
    }
});

