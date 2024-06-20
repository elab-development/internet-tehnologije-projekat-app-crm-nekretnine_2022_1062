<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class PropertyController extends Controller
{
    public function index()
    {
        $properties = Property::all();
        return response()->json($properties, 200);
    }

    public function show($id)
    {
        $property = Property::findOrFail($id);
        return response()->json($property, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $property = Property::create([
            'name' => $request->name,
            'address' => $request->address,
            'price' => $request->price,
            'description' => $request->description,
            'user_id' => Auth::id(),
        ]);

        return response()->json($property, 201);
    }

    public function update(Request $request, $id)
    {
        $property = Property::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $property->update([
            'name' => $request->name,
            'address' => $request->address,
            'price' => $request->price,
            'description' => $request->description,
            'user_id' => Auth::id(), // Koristimo ID ulogovanog korisnika
        ]);

        return response()->json($property, 200);
    }

    public function destroy($id)
    {
        $property = Property::findOrFail($id);
        $property->delete();
        return response()->json(['message' => 'Property deleted successfully'], 200);
    }
}
