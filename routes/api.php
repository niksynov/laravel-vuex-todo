<?php
/**
 * @var \Illuminate\Routing\Router $api
 */

Route::group(['middleware' => 'jwt.refresh'], function () {
    Route::get('user', 'User\UserController@getUser');
});
/**
 * Auth routes
 */
Route::post('register', 'Auth\RegisterController@registerNewUser');
Route::post('login', 'Auth\LoginController@login');
/**
 * User routes
 */
Route::get('user', 'User\UserController@getUser');
Route::get('user/task', 'User\TaskController@getUserTasks');
Route::get('user/task/done', 'User\TaskController@getUserDoneTasks');
Route::post('user/task', 'User\TaskController@createNewUserTask');
Route::post('user/task/{id}/done', 'User\TaskController@markTaskAsDone');
Route::put('user/task/{id}', 'User\TaskController@editTask');
Route::delete('user/task/{id}', 'User\TaskController@deleteTask');