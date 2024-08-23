<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Backend\RolesController;
use App\Http\Controllers\Backend\UserController;

Route::middleware(['auth:api'])->group(function () {
    Route::apiResource('user', UserController::class);
    Route::post('get-user', [UserController::class, 'getUser']);
    Route::post('update-user', [UserController::class, 'update_user']);
    Route::post('delete-user', [UserController::class, 'destroy_user']);

    Route::get('get-role/{id?}', [AuthController::class, 'getRoleAndPermissionByid']);
    Route::get('get-roles/{id?}', [AuthController::class, 'getRoleAndPermission']);
    Route::post('update-role', [RolesController::class, 'update_role']);
    Route::post('store-role', [RolesController::class, 'store']);
    Route::get('permissions', [AuthController::class, 'index']);
    Route::post('role-delete', [RolesController::class, 'delete_role']);
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
});

Route::middleware(['auth:api'])->group(function () {
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('me', [AuthController::class, 'me']);
});

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
