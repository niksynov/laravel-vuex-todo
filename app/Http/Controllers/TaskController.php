<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;

class TaskController extends Controller
{
    use GuardHelpers;

    public function getUserTasks(Request $request)
    {
        try {

            $user = JWTAuth::parseToken()->authenticate();

            $tasks = $user->tasks()->get();

            return TaskResource::collection($tasks)->response();

        } catch (TokenExpiredException $e) {

            return response()->json(['Forbidden'], 403);

        }
    }

    public function getUserDoneTasks(Request $request)
    {
        try {

            $user = JWTAuth::parseToken()->authenticate();

            $tasks = $user->tasks->where('done', true)->all();

            return response()->json($tasks, 200);

        } catch (TokenExpiredException $e) {

            return response()->json(['Forbidden'], 403);

        }
    }

    public function createNewUserTask(Request $request)
    {
        try {

            $user = JWTAuth::parseToken()->authenticate();

            $task = $user->tasks()->create([
                'text' => $request->text
            ]);

            return new TaskResource($task);

        } catch (TokenExpiredException $e) {

            return response()->json(['Forbidden'], 403);

        }
    }

    public function markTaskAsDone(Request $request, $taskId)
    {
        try {

            $user = JWTAuth::parseToken()->authenticate();

            $task = $user->tasks->where('id', $taskId)->first();

            $task->update(['done' => true]);

            return new TaskResource($task);

        } catch (TokenExpiredException $e) {

            return response()->json(['Forbidden'], 403);

        }
    }

    public function editTask(Request $request, $taskId)
    {
        try {

            $user = JWTAuth::parseToken()->authenticate();

            $task = $user->tasks->where('id', $taskId)->first();

            $task->update(['text' => $request->text]);

            return new TaskResource($task);

        } catch (TokenExpiredException $e) {

            return response()->json(['Forbidden'], 403);

        }
    }

    public function deleteTask(Request $request, $taskId)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $task = $user->tasks->where('id', $taskId)->first();

            $task->delete();

            return response()->json([], 200);

        } catch (TokenExpiredException $e) {

            return response()->json(['Forbidden'], 403);

        }
    }
}
