@extends('layouts.main')

@section("header")
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <link rel="stylesheet" href="{{asset('css/map.css')}}">
@stop

@section('content')
    <h1>Your Location</h1>

    <div id="User-Map"></div>

    @stop

    @section("footer")

    <!--Build Local JavaScripts -->
    <script src="{{asset('js/map2.js')}}"></script>
    <!--Build Google Map API -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAomTWe6-_JXMoza7hm9olIQLZ8TEq5PdY&callback=createMap"
            async defer type="text/javascript"></script>
@stop

