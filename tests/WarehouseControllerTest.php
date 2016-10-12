<?php


class WarehouseControllerTest extends TestCase
{

    private function getToken($me)
    {
        $me->action('POST', 'AuthenticateController@authenticate', ['email' => 'super@admin.com', 'password' => 'admin']);
        return json_decode($me->response->getContent(), true)['token'];
    }
    public function testAllArchivedCases()
    {
        $this->call('GET', '/Warehouse/AllArchivedCases?token='. $this->getToken($this));
        $this->assertResponseOk();
    }
    public function testAllForecastCases()
    {
        $this->call('GET', '/Warehouse/AllForecastCases?token='. $this->getToken($this));
        $this->assertResponseOk();
    }
    public function testAllBufferCases()
    {
        $this->call('GET', '/Warehouse/AllBufferCases?token='. $this->getToken($this));
        $this->assertResponseOk();
    }
    public function testReturnedCase()
    {
        $this->call('GET', '/Warehouse/ReturnedCase/-1?token='. $this->getToken($this));
        $this->assertResponseOk();
    }
    public function testGetAllSellers()
    {
        $this->call('GET', '/Warehouse/GetAllSellers?token='. $this->getToken($this));
        $this->assertResponseOk();
    }
    public function testUpdateCaseData()
    {
        $postData = ['test' => true];
        $this->call('POST', '/Warehouse/UpdateCaseData/-1?token='. $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }

}