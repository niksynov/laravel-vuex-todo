<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;

class TaskController extends Controller
{
    use GuardHelpers;

    public function getUserTasks(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $tasks = $user->tasks()->where('done', false)->get();

        return response()->json($tasks, 200);
    }

    public function getUserDoneTasks(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $tasks = $user->tasks->where('done', true)->all();

        return response()->json($tasks, 200);
    }

    public function createNewUserTask(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $task = $user->tasks()->create([
            'text' => $request->text
        ]);

        return response()->json($task, 200);
    }

    public function markTaskAsDone(Request $request, $taskId)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $task = $user->tasks->where('id', $taskId)->first();

        $task->update(['done' => true]);

        return response()->json($task, 200);
    }

    public function editTask(Request $request, $taskId)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $task = $user->tasks->where('id', $taskId)->first();

        $task->update(['text' => $request->text]);

        return response()->json($task, 200);
    }

    public function deleteTask(Request $request, $taskId)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $task = $user->tasks->where('id', $taskId)->first();

        $task->delete();

        return response()->json([], 200);
    }
}
