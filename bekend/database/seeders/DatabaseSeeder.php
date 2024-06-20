<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
// Kreiranje korisnika
DB::table('users')->insert([
    [
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => Hash::make('password'),
        'admin' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'name' => 'User One',
        'email' => 'user1@example.com',
        'password' => Hash::make('password'),
        'admin' => 0,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'name' => 'User Two',
        'email' => 'user2@example.com',
        'password' => Hash::make('password'),
        'admin' => 0,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'name' => 'User Three',
        'email' => 'user3@example.com',
        'password' => Hash::make('password'),
        'admin' => 0,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'name' => 'User Four',
        'email' => 'user4@example.com',
        'password' => Hash::make('password'),
        'admin' => 0,
        'created_at' => now(),
        'updated_at' => now(),
    ]
]);

// Kreiranje klijenata
DB::table('clients')->insert([
    [
        'client_name' => 'Client One',
        'client_email' => 'client1@example.com',
        'client_phone' => '123456789',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'client_name' => 'Client Two',
        'client_email' => 'client2@example.com',
        'client_phone' => '123456780',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'client_name' => 'Client Three',
        'client_email' => 'client3@example.com',
        'client_phone' => '123456781',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'client_name' => 'Client Four',
        'client_email' => 'client4@example.com',
        'client_phone' => '123456782',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'client_name' => 'Client Five',
        'client_email' => 'client5@example.com',
        'client_phone' => '123456783',
        'created_at' => now(),
        'updated_at' => now(),
    ]
]);

// Kreiranje nekretnina
DB::table('properties')->insert([
    [
        'name' => 'Property One',
        'address' => 'Address 1',
        'price' => 100000,
        'description' => 'Description for Property One',
        'user_id' => 1,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'name' => 'Property Two',
        'address' => 'Address 2',
        'price' => 200000,
        'description' => 'Description for Property Two',
        'user_id' => 2,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'name' => 'Property Three',
        'address' => 'Address 3',
        'price' => 300000,
        'description' => 'Description for Property Three',
        'user_id' => 3,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'name' => 'Property Four',
        'address' => 'Address 4',
        'price' => 400000,
        'description' => 'Description for Property Four',
        'user_id' => 4,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'name' => 'Property Five',
        'address' => 'Address 5',
        'price' => 500000,
        'description' => 'Description for Property Five',
        'user_id' => 5,
        'created_at' => now(),
        'updated_at' => now(),
    ]
]);

// Kreiranje transakcija
DB::table('transactions')->insert([
    [
        'property_id' => 1,
        'client_id' => 1,
        'user_id' => 1,
        'transaction_date' => now(),
        'amount' => 100000,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'property_id' => 2,
        'client_id' => 2,
        'user_id' => 2,
        'transaction_date' => now(),
        'amount' => 200000,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'property_id' => 3,
        'client_id' => 3,
        'user_id' => 3,
        'transaction_date' => now(),
        'amount' => 300000,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'property_id' => 4,
        'client_id' => 4,
        'user_id' => 4,
        'transaction_date' => now(),
        'amount' => 400000,
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'property_id' => 5,
        'client_id' => 5,
        'user_id' => 5,
        'transaction_date' => now(),
        'amount' => 500000,
        'created_at' => now(),
        'updated_at' => now(),
    ]
]);



 

    }
}
