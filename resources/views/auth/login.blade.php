@extends('layouts.main')



@section('content')
    <h1>This is login Page</h1>
    <form action="{{url('signin')}}" method="POST">
        {{csrf_field()}}
        Username: <input type="text" name="email">
        Password: <input type="password" name="password">
        <input type="submit" value="Login">
    </form>
@stop

