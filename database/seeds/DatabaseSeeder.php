<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('secret'),
        ],
            [
                'name' => 'seller',
                'email' => 'seller@gmail.com',
                'password' => Hash::make('seller'),
            ],
            [
                'name' => 'warehouse',
                'email' => 'warehouse@gmail.com',
                'password' => Hash::make('warehouse'),
            ] );
    }
}
