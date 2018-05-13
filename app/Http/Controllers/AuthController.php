<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }

        } catch (JWTException $e) {

            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        $user = auth()->user();

        return (new UserResource($user))->additional([
            'data' => [
                'token' => $token
            ]
        ])->response();
    }

    public function registration(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required|min:2',
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')
            ],
            'password' => 'required|min:6',
            'password_c' => 'required|same:password'
        ]);

        if ($validator->fails()) {

            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {

            $user = User::create([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => bcrypt($request->get('password'))
            ]);

            $token = JWTAuth::fromUser($user);

            DB::commit();

            return (new UserResource($user))->additional([
                'data' => [
                    'token' => $token
                ]
            ])->response();

        } catch (\Exception $e) {

            DB::rollBack();

            abort(500);
        }
    }
}
