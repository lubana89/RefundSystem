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
        $permission->name='user-role-permission';
        $permission->display_name='user-role-permission';
        $permission->description='only Administrator can create/edit users roles permissions ';
        $permission->save();

        $permission=new Permission();
        $permission->name='RefundCase';
        $permission->display_name='RefundCase';
        $permission->description='only Administrator|Seller can create/edit RefundCase ';
        $permission->save();

        $permission=new Permission();
        $permission->name='WarehousePermission';
        $permission->display_name='WarehousePermission';
        $permission->description='WarehousePermission';
        $permission->save();
    }
}
