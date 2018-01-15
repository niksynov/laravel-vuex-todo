<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Auth\RegisterNewUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class RegisterController
{
    public function registerNewUser(RegisterNewUserRequest $request)
    {
        DB::beginTransaction();

        try {

            User::create([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => bcrypt($request->get('password'))
            ]);

            DB::commit();

        } catch (Exception $e) {

            DB::rollBack();

            return response('Error', 500);

        }

        return response()->json(['message' => 'User was successfully created']);
    }
}