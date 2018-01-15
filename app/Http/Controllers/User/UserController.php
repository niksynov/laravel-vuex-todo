<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        return response()->json($user->name);
    }
}
