<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $user = null;
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            return response()->json([
                'status_code' => 401,
                'message' => 'Unauthorized'
            ], '401');
        } catch (TokenInvalidException $e) {
            return response()->json([
                'status_code' => 401,
                'message' => 'Unauthorized'
            ], '401');
        }
        return response()->json(['userName' => $user->name]);
    }
}
