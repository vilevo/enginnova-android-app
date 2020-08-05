<?php

namespace App\Http\Controllers;

use App\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class NotificationController extends Controller
{
    public function index(){
        $notifications = Notification::paginate(15);

        return $notifications;
    }

    public function show($id){
        $notification = Notification::find($id);

        if($notification == null){
            return [
                'error' => true,
                'notification' => $notification,
                'message' => ['La notification n\'existe pas']
            ];
        }

        return [
            'error' => false,
            'notification' => $notification
        ];
    }

    public function create(Request $request){
        // validate data
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'description' => 'required',
            'date' => 'required|date'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $notification = new Notification();
        $notification->title = $request->input('title');
        $notification->description = $request->input('description');
        $notification->date = $request->input('date');

        $notification->save();

        return [
            'error' => false,
            'notification' => $notification
        ];
    }

    public function edit(Request $request, $id){
        // validate data
        $validator = Validator::make($request->all(),[
            'content' => 'required'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $notification = Notification::find($id);
        $notification->title = $request->input('title');
        $notification->description = $request->input('description');
        $notification->date = $request->input('date');

        $notification->save();

        return [
            'error' => false,
            'notification' => $notification
        ];
    }

    public function delete($id){
        $notification = Notification::find($id);

        if($notification==null){
            return [
                'error' => true,
                'message' => ['La notification n\'existe pas']
            ];
        }

        $notification->delete();

        return [
            'error' => false,
            'notification' => $notification
        ];
    }

    public function notificationsByDate(){

        $notifications = Notification::groupBy('date')->get();

        return [
            'error' => false,
            'notifications' => $notifications
        ];
    }
}