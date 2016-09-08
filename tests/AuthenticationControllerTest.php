<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthenticationControllerTest extends TestCase
{


    /**
     * A basic functional test example.
     *
     * @return void
     *
     */
    private function getToken($me)
    {
        $me->action('POST', 'AuthenticateController@authenticate', ['email' => 'super@admin.com', 'password' => 'admin']);
        return json_decode($me->response->getContent(), true)['token'];
    }

    public function testLogin()
    {
        $postData = ['test' => true, 'email' => 'super@admin.com', 'password' => 'admin'];
        $this->action('POST', 'AuthenticateController@authenticate', $postData);
        $this->assertSame(json_decode($this->response->getContent(), true), 'UP');
    }

    public function testGetAuthSuper()
    {
        $this->call('GET', '/api/authenticate/user?token=' . $this->getToken($this));
        $this->assertSame(json_decode($this->response->getContent(), true)['user']['email'] , 'super@admin.com');
    }

    public function testGetAuthSuperRole()
    {
        $this->call('GET', '/api/GetRole?token=' . $this->getToken($this));
        $this->assertSame(json_decode($this->response->getContent(), true) , 'Admin');
    }

    public function testGetUsers()
    {

        $this->call('GET', '/api/Users?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testGetRoles()
    {
        $this->call('GET', '/api/Roles?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testAllCases()
    {
        $this->call('GET', '/api/AllCases?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }
    public function testDeleteUser()
    {
        $this->call('GET', '/api/DeleteUser/-1?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }
    public function testCreateUser()
    {
        $postData = ['test' => true];
        $this->call('POST', '/api/CreateUser?token=' . $this->getToken($this), $postData);
         $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }

    public function testAttachPermission()
    {
        $postData = ['test' => true];
        $this->call('POST', '/api/AttachPermission?token=' . $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }
    public function testAssignRole()
    {
        $postData = ['test' => true];
        $this->call('POST', '/api/AssignRole?token=' . $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }
    public function testCreatePermission()
    {
        $postData = ['test' => true];
        $this->call('POST', '/api/CreatePermission?token=' . $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }
    public function testCreateRole()
    {
        $postData = ['test' => true];
        $this->call('POST', '/api/CreateRole?token=' . $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }
    public function testUpdateUser()
    {
        $postData = ['test' => true];
        $this->call('POST', '/api/UpdateUser?token=' . $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }
}
