@extends('layouts.main')

@section("header")
    <link rel="stylesheet" href="{{asset('css/map.css')}}">
@stop

@section('content')
    <h1>Your Location v2.0</h1>

    <form @submit.prevent="locateAddress" id="locationForm">
        <input type="text" id="address" v-model="address" placeholder="123 Example St">
        <button type="submit">Locate</button>
    </form>


    <template id="map-template">
        <div id="map"></div>
    </template>


    <pre>@{{$data |json}}</pre>

    @stop

    @section("footer")

    <!--Build Vue.js -->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.14/vue.min.js"></script>
    <!--Build Local JavaScripts -->
    <script src="{{asset('js/map-component.js')}}"></script>
    <!--Build Google Map API -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAomTWe6-_JXMoza7hm9olIQLZ8TEq5PdY&callback=app.init"
            async defer></script>
@stop

