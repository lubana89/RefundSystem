<?php
use App\Permission;
use Illuminate\Database\Seeder;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permission=new Permission();
        $permission->name='create-users';
        $permission->display_name='Create Users';
        $permission->description='only Administrator can create users ';
        $permission->save();
    }
}
