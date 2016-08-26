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
        $permission->name='Admin';
        $permission->display_name='Admin';
        $permission->description='Admin';
        $permission->save();

        $permission=new Permission();
        $permission->name='Seller';
        $permission->display_name='Seller';
        $permission->description='Seller';
        $permission->save();

        $permission=new Permission();
        $permission->name='Warehouse';
        $permission->display_name='Warehouse';
        $permission->description='Warehouse';
        $permission->save();
    }
}
