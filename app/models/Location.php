<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $table = 'locations';

    protected $fillable =[
        'latitude','longitude'
    ];
}
