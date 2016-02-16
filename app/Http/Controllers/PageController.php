<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    public function showLogin(){
        return view('auth.login');
    }


    public function handleLogin(Request $request){

        $email = $request->input('email');
        $password = $request->input('password');

        //if authentication is passed
        if($email == config('services.pa.email') && $password == config('services.pa.password')){

        //register a user
        Auth::loginUsingId(1);

        return redirect('map');
        }
        //return Auth::user();
        else
        dd(config('services.pa.email'));

    }

    public function handleLogout(){

        Auth::logout();
        return redirect('signin');
    }
}
