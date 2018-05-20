<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    use GuardHelpers;

    public function getUserTasks(Request $request)
    {
        $user = auth()->user();

        $tasks = $user->tasks()->orderBy('created_at', 'DESC')->get();

        return TaskResource::collection($tasks)->response();
    }

    public function getUserDoneTasks(Request $request)
    {
        $user = $user = auth()->user();

        $tasks = $user->tasks->where('done', true)->all();

        return TaskResource::collection($tasks)->response();
    }

    public function createNewUserTask(Request $request)
    {
        \DB::beginTransaction();

        try {

            $user = auth()->user();

            $task = $user->tasks()->create([
                'text' => $request->text
            ]);

            \DB::commit();

            return new TaskResource($task);

        } catch (\Exception $e) {

            \DB::rollBack();

            abort(500, 'Server error');
        }
    }

    public function markTaskAsDone(Request $request, $taskId)
    {
        \DB::beginTransaction();

        try {

            $user = auth()->user();

            $task = $user->tasks->where('id', $taskId)->first();

            $task->update(['done' => true]);

            \DB::commit();

            return new TaskResource($task);

        } catch (\Exception $e) {

            \DB::rollBack();

            abort(500, 'Server error');
        }
    }

    public function editTask(Request $request, $taskId)
    {
        \DB::beginTransaction();

        try {

            $user = auth()->user();

            $task = $user->tasks->where('id', $taskId)->first();

            $task->update(['text' => $request->text]);

            \DB::commit();

            return new TaskResource($task);

        } catch (\Exception $e) {

            \DB::rollBack();

            abort(500, 'Server error');
        }
    }

    public function deleteTask(Request $request, $taskId)
    {
        \DB::beginTransaction();

        try {

            $user = auth()->user();

            $task = $user->tasks->where('id', $taskId)->first();

            $task->delete();

            \DB::commit();

            return response()->json([], 200);

        } catch (\Exception $e) {

            \DB::rollBack();

            abort(500, 'Server error');
        }
    }
}
