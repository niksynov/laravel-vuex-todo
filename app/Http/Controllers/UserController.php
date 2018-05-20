<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $user = auth()->user();

        $token = JWTAuth::fromUser($user);

        return (new UserResource($user))->additional([
            'data' => [
                'token' => $token
            ]
        ])->response();
    }
}
