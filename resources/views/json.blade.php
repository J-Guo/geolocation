@extends('layouts.main')

@section('header')
    <meta name="csrf-token" content="{{ csrf_token() }}" />
@stop

@section('content')
    <h1>Test Laravel Ajax</h1>

    <button id="jsonButton">Get JSON data</button>

@stop

@section('footer')
    <script>
        $(document).ready(function(){
            var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

            $("#jsonButton").click(function(){
                alert('JSON Test');
                $.ajax({
                    url: 'geo-data',
                    type: 'POST',
                    data: {_token: CSRF_TOKEN},
                    dataType: 'JSON',
                    success: function (data) {
                        console.log(data['latitude']);
                        console.log(data['longitude']);
                    }
                });
            });
        });
    </script>
@stop


