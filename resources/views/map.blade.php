@extends('layouts.main')

@section("header")
<link rel="stylesheet" href="{{asset('css/map.css')}}">
@stop

@section('content')
    <h1>Your Location</h1>

    <form @submit.prevent="locateAddress" id="locationForm">
        <input type="text" id="address" v-model="address" placeholder="123 Example St">
        <button type="submit">Locate</button>
    </form>

    <div id="User-Map"></div>
    <pre>@{{$data |json}}</pre>

@stop

@section("footer")

    <!--Build Vue.js -->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.14/vue.min.js"></script>
    <!--Build Local JavaScripts -->
    <script src="{{asset('js/map.js')}}"></script>
    <!--Build Google Map API -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAomTWe6-_JXMoza7hm9olIQLZ8TEq5PdY&callback=app.createMap"
    async defer></script>
@stop

