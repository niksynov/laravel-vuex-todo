<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        try {

            $user = JWTAuth::parseToken()->authenticate();

            $token = JWTAuth::fromUser($user);

            return (new UserResource($user))->additional([
                'data' => [
                    'token' => $token
                ]
            ])->response();

        } catch (TokenExpiredException $e) {

            return response()->json(['Forbidden'], 403);

        }
    }
}
