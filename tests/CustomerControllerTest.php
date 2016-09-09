<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CustomerControllerTest extends TestCase
{


    /**
     * A basic functional test example.
     *
     * @return void
     *
     */


    public function testStatus()
    {
        $this->call('GET', '/Status/-1');
        $this->assertResponseOk();
    }
    public function testQR()
    {
        $this->call('GET', '/QR');
        $this->assertResponseOk();
    }
    public function testCustomerRefund()
    {
        $this->call('GET', 'Customer/Refund/-1');
        $this->assertResponseOk();
    }
    public function testUpdateCaseData()
    {
        $postData = ['test' => true];
        $this->call('POST', '/UpdateCaseData', $postData);
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }
}
