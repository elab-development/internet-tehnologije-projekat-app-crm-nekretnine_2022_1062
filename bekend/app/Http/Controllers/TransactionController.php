<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::all();
        return response()->json($transactions, 200);
    }

    public function show($id)
    {
        $transaction = Transaction::findOrFail($id);
        return response()->json($transaction, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,id',
            'client_id' => 'required|exists:clients,id',
            'transaction_date' => 'required|date',
            'amount' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $transaction = Transaction::create([
            'property_id' => $request->property_id,
            'client_id' => $request->client_id,
            'user_id' => Auth::id(),
            'transaction_date' => $request->transaction_date,
            'amount' => $request->amount,
        ]);

        return response()->json($transaction, 201);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,id',
            'client_id' => 'required|exists:clients,id',
            'transaction_date' => 'required|date',
            'amount' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $transaction->update([
            'property_id' => $request->property_id,
            'client_id' => $request->client_id,
            'user_id' => Auth::id(),
            'transaction_date' => $request->transaction_date,
            'amount' => $request->amount,
        ]);

        return response()->json($transaction, 200);
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully'], 200);
    }
}
