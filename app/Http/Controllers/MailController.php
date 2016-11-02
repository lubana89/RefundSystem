<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class MailController extends Controller
{


    public function Email($Subject, $Body,$TO)
    {
        $From='no-reply@oubo.de';
        $FromName='OUBO';
        switch ($Subject) {
            case 'Refund Link':
                Mail::send('emails.RefundLink', array('link' => $Body, 'name' => Auth::user()->name), function ($message) use ($Subject,$From,$FromName,$TO) {
                    $message->to($TO)->subject
                    ($Subject);
                    $message->from($From, $FromName);
                });
                break;
            case 'Request Case':
                Mail::send('emails.RqstNewCase', array('data' => json_decode($Body, true)), function ($message) use ($Subject,$From,$FromName,$TO) {
                    $message->to($TO)->subject($Subject);
                    $message->from($From, $FromName);
                });
                break;
        }
        return;
    }


}
