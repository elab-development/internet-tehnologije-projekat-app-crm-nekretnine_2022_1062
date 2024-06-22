<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\TransactionController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

 
Route::get('properties', [PropertyController::class, 'index']);
Route::get('properties/{id}', [PropertyController::class, 'show']);
Route::post('properties', [PropertyController::class, 'store'])->middleware('auth:sanctum');
Route::put('properties/{id}', [PropertyController::class, 'update'])->middleware('auth:sanctum');
Route::delete('properties/{id}', [PropertyController::class, 'destroy'])->middleware('auth:sanctum');




Route::middleware('auth:sanctum')->group(function () {

    Route::get('users', [AuthController::class, 'index']);

    Route::get('clients', [ClientController::class, 'index']);
    Route::get('clients/{id}', [ClientController::class, 'show']);
    Route::post('clients', [ClientController::class, 'store']);
    Route::put('clients/{id}', [ClientController::class, 'update']);
    Route::delete('clients/{id}', [ClientController::class, 'destroy']);

    Route::apiResource('transactions', TransactionController::class);
});
