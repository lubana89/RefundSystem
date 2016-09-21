<?php


class SellerControllerTest extends TestCase
{

    private function getToken($me)
    {
        $me->action('POST', 'AuthenticateController@authenticate', ['email' => 'super@admin.com', 'password' => 'admin']);
        return json_decode($me->response->getContent(), true)['token'];
    }

    public function testAllCases()
    {
        $this->call('GET', '/Seller/AllCases/1?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testDeleteCase()
    {
        $this->call('GET', '/Seller/DeleteCase/-1?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testGetLink()
    {
        $this->call('GET', '/Seller/GetLink/-1?token=' . $this->getToken($this));
        $this->assertResponseStatus(500);
    }
    public function testGetMailLink(){
        $this->call('GET', '/Seller/GetMailLink/-1?token=' . $this->getToken($this));
        $this->assertResponseStatus(404);
    }
    public function testGetAllAdmins()
    {
        $this->call('GET', '/Seller/GetAllAdmins?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testGenerateRefundLink()
    {
        $postData = ['test' => true];
        $this->call('POST', '/Seller/GenerateRefundLink?token=' . $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true), 'UP');
    }

    public function testUpdateCaseData()
    {
        $postData = ['test' => true];
        $this->call('POST', '/Seller/UpdateCaseData/-1?token=' . $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true), 'UP');
    }
}