<?php
use App\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $owner=new Role();
        $owner->name='Admin';
        $owner->display_name='Administrator';
        $owner->description='Admin from Warehouse';
        $owner->save();

        $owner=new Role();
        $owner->name='Seller';
        $owner->display_name='Seller';
        $owner->description='Seller of the product';
        $owner->save();

        $owner=new Role();
        $owner->name='Warehouse';
        $owner->display_name='Warehouse';
        $owner->description='Warehouse';
        $owner->save();

    }
}
