<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create(
            [
                'name' => 'Super Admin',
                'email' => 'super@gmail.com',
                'role' => 'superadmin',
                'password' => bcrypt("12345678"),
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ],
        );
    }
}
