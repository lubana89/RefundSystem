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
            'name' => 'jaspreet',
            'email' => 'jaspreet@gmail.com',
            'password' => Hash::make('jass'),
        ]);
    }
}
