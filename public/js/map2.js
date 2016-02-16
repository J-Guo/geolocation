/**
 * Created by Junjie on 25/01/2016.
 */


var la;
var lo;

var map;

function createMap() {

    la= setLatitude();
    lo= setLongitude();
    var centerCoord = new google.maps.LatLng(la, lo); //dyanmic address through ajax
    var mapOptions = {
        zoom: 12,
        center: centerCoord,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('User-Map'),mapOptions);
    function sayHello(){alert('hahahhaha');}
}

//Calling return data['latitude']; from the success does not mean that it will be the return value of the setLatitude method.
//Actually your setLatitude does not have any return value.
//On the other hand, the AJAX request runs asynchronously, which means that at the time your success callback is called your createMap method has already been called,
//with undefined as the value of la field. The simplest solution is to add async: false to your ajax call

function setLatitude(){
    var result;
    $.ajax({
        url: 'geo-data',
        type: 'POST',
        async: false,
        dataType: 'JSON',
        success: function (data) {
            result =  data['latitude'];
        }
    });

    return result;
}

function setLongitude(){
    var result;
    $.ajax({
        url: 'geo-data',
        type: 'POST',
        async: false,
        dataType: 'JSON',
        success: function (data) {
            result =  data['longitude'];
        }
    });

    return result;
}






