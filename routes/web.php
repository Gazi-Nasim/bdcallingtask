<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!admin).*$');


Auth::routes();

Route::group(['prefix' => 'admin'], function () {
    Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::resource('/user', App\Http\Controllers\HomeController::class)->names('user');
    Route::resource('/users', App\Http\Controllers\Backend\UserController::class)->names('user');
    Route::resource('general', App\Http\Controllers\Backend\GeneralinfoController::class)->names('general');
    Route::resource('roles', App\Http\Controllers\Backend\RolesController::class)->names('role');
})->middleware(['auth', 'verified']);;
