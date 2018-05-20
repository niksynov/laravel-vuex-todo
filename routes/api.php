<?php
/**
 * @var \Illuminate\Routing\Router $api
 */
/**
 * Auth routes
 */
Route::post('register', 'AuthController@registration');
Route::post('login', 'AuthController@login');
/**
 * User routes
 */
Route::middleware(['jwt.auth', 'jwt.refresh'])->group(function () {
    Route::get('user', 'UserController@getUser');
    Route::get('user/task', 'TaskController@getUserTasks');
    Route::get('user/task/done', 'TaskController@getUserDoneTasks');
    Route::post('user/task', 'TaskController@createNewUserTask');
    Route::post('user/task/{id}/done', 'TaskController@markTaskAsDone');
    Route::put('user/task/{id}', 'TaskController@editTask');
    Route::delete('user/task/{id}', 'TaskController@deleteTask');
});