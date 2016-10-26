<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class MailController extends Controller
{


    public function Email($Subject, $Body)
    {
        switch ($Subject) {
            case 'Refund Link':
                Mail::send('emails.RefundLink', array('link' => $Body, 'name' => Auth::user()->name), function ($message) use ($Subject) {
                    $message->to(Auth::user()->email, Auth::user()->name)->subject
                    ($Subject);
                    $message->from('no-reply@oubo.de', 'OUBO');
                });
                break;
            case 'Request Case':
                Mail::send('emails.RqstNewCase', array('data' => json_decode($Body, true)), function ($message) use ($Subject) {
                    $message->to('no-reply@oubo.de', 'OUBO')->subject($Subject);
                    $message->from('no-reply@oubo.de', 'Customer');
                });
                break;
        }
        return;
    }


}
