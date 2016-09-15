<?php


class CommunicationControllerTest extends TestCase
{
    private function getToken($me)
    {
        $me->action('POST', 'AuthenticateController@authenticate', ['email' => 'super@admin.com', 'password' => 'admin']);
        return json_decode($me->response->getContent(), true)['token'];
    }

    public function testMarkUnRead()
    {
        $this->call('GET', '/Communication/MarkUnRead/-1?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testMarkRead()
    {
        $this->call('GET', '/Communication/MarkRead/-1?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testGetAllNotifications()
    {
        $this->call('GET', '/Communication/GetAllNotifications/-1?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testMarkAllNotificationRead()
    {
        $this->call('GET', '/Communication/MarkAllNotificationRead/-1?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testGetTopFiveNotifications()
    {
        $this->call('GET', '/Communication/GetTopFiveNotifications/-1?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testGetNotificationCount()
    {
        $this->call('GET', '/Communication/GetNotificationCount/-1?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testGetAllMessage()
    {
        $this->call('GET', '/Communication/GetAllMessage/-1?token=' . $this->getToken($this));
        $this->assertResponseOk();
    }

    public function testGetChainNotifications()
    {
        $this->call('GET', '/Communication/GetChainNotifications/-1?token=' . $this->getToken($this));
        $this->assertResponseStatus(500);
    }


    public function testSendNotification()
    {
        $postData = ['test' => true];
        $this->call('POST', '/Communication/SendNotification?token=' . $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }
    public function testReplyNotification()
    {
        $postData = ['test' => true];
        $this->call('POST', '/Communication/ReplyNotification?token=' . $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }
    public function testAddMessage()
    {
        $postData = ['test' => true];
        $this->call('POST', '/Communication/AddMessage?token=' . $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }
    public function testUpdateNotification()
    {
        $postData = ['test' => true];
        $this->call('POST', '/api/UpdateNotification?token=' . $this->getToken($this), $postData);
        $this->assertSame(json_decode($this->response->getContent(), true) , 'UP');
    }
}