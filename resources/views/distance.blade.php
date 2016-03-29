@extends('layouts.main')

@section("header")
    <link rel="stylesheet" href="{{asset('css/map.css')}}">
@stop

@section('content')
    <h1>Distance Calculator</h1>

    <form action="distance-calculator" method="get">
        From Location Latitude:<input type="text" name="fromLat">
        From Location Longitude:<input type="text" name="fromLon">
        To Location Latitude:<input type="text" name="toLat">
        To Location longitude:<input type="text" name="toLon">
        <input type="submit" value="Submit">
    </form>



@stop

