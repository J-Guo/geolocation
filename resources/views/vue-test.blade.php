@extends('layouts.main')

@section('content')
    <h1>Vus.js Test</h1>

    <div id="demo">
        <p>@{{message}}</p>
        <input v-model="message">
    </div>

@stop

@section("footer")


    <script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.14/vue.min.js"></script>
    <script>
        var demo = new Vue({
            el: '#demo',
            data: {
                message: 'Hello Vue.js!'
            }
        })

    </script>

@stop

