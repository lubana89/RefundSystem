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
            'name' => 'SuperUser',
            'email' => 'super@admin.com',
            'password' => Hash::make('admin'),
        ]);
    }
}
