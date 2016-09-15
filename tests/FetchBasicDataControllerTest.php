<?php

class FetchBasicDataControllerTest extends TestCase
{


    public function testwish()
    {
        $this->call('GET', '/wish');
        $this->assertResponseOk();
    }

    public function testreason()
    {
        $this->call('GET', '/reason');
        $this->assertResponseOk();
    }

    public function testitemCondition()
    {
        $this->call('GET', '/itemCondition');
        $this->assertResponseOk();
    }
    public function testCustomerRefundFetch()
    {
        $this->call('GET', 'Customer/Refund/-1/Fetch');
        $this->assertResponseStatus(500);
    }

}