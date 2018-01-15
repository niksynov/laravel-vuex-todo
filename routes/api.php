<?php
/**
 * @var \Illuminate\Routing\Router $api
 */

Route::group(['middleware' => 'jwt.refresh'], function () {
    Route::get('user', 'User\UserController@getUser');
});
Route::post('register', 'Auth\RegisterController@registerNewUser');
Route::post('login', 'Auth\LoginController@login');
