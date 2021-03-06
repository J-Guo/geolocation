@extends('layouts.main')

@section("header")
    <link rel="stylesheet" href="{{asset('css/map6.css')}}">
    <input type="hidden" name="_token" value="{{ csrf_token() }}" />
@stop

@section('content')
    <h1>Google Map Geocoding Reverse</h1>



    @stop

    @section("footer")

            <!--Build Vue.js -->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.14/vue.min.js"></script>
    <!--Build Loading Overlay -->
    <script src="{{asset('js/loadingoverlay.js')}}"></script>
    <!--Build Local JavaScripts -->
    <script src="{{asset('js/map11.js')}}"></script>
    <!--Build Google Map API -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAomTWe6-_JXMoza7hm9olIQLZ8TEq5PdY&libraries=places&callback=initAutocomplete"
            async defer></script>
@stop

