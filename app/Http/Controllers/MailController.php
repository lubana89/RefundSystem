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
        if ($Subject == 'Refund Link') {

                Mail::send('emails.RefundLink', array('link' => $Body, 'name' => Auth::user()->name), function ($message) use ($Subject) {
                    $message->to(Auth::user()->email, Auth::user()->name)->subject
                    ($Subject);
                    $message->from('no-reply@oubo.de', 'OUBO');
                });

        }
        return;
    }


}
