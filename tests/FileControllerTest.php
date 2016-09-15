<?php

class FileControllerTest extends TestCase
{

    private function getToken($me)
    {
        $me->action('POST', 'AuthenticateController@authenticate', ['email' => 'super@admin.com', 'password' => 'admin']);
        return json_decode($me->response->getContent(), true)['token'];
    }
    public function testGetAllImages()
    {
        $this->call('GET', '/Communication/File/GetAllImages/-1?token='. $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testuploadImage()
    {

        $this->call('POST', 'File/Upload/test');
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }
}