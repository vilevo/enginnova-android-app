<?php

namespace App\Http\Controllers;

use App\Exponent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class ExponentController extends Controller
{

    public function index(){
        $exponents = Exponent::paginate(20);

        return $exponents;
    }

    public function show($id){
        $exponent = Exponent::find($id);

        if($exponent == null){
            return [
                'error' => true,
                'message' => ['Le groupe de exposant n\'existe pas']
            ];
        }

        return [
            'error' => false,
            'exponent' => $exponent,
            'exponent_members' => $exponent->exponent_members()->get()
        ];
    }

    public function create(Request $request){
        // validate data
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'subject' => 'required'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $exponent = new Exponent();
        $exponent->name = $request->input('name');
        $exponent->subject = $request->input('subject');
        $exponent->description = $request->input('description');
        $exponent->enterprise_name = $request->input('enterprise_name');

        $exponent->save();

        return [
            'error' => false,
            'exponent' => $exponent
        ];
    }

    public function edit(Request $request, $id){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'subject' => 'required'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $exponent = Exponent::find($id);
        if($exponent==null){
            return [
                'error' => true,
                'exponent' => $exponent,
                'message' => ['Le groupe des exposants n\'existe pas']
            ];
        }

        $exponent->name = $request->input('name');
        $exponent->subject = $request->input('subject');
        $exponent->description = $request->has('description')?$request->input('description'):$exponent->description;
        $exponent->enterprise_name = $request->has('enterprise_name')?$request->input('enterprise_name'):$exponent->enterprise_name;

        $exponent->save();

        return [
            'error' => false,
            'exponent' => $exponent
        ];
    }

    public function delete($id){
        $exponent = Exponent::find($id);

        if($exponent==null){
            return [
                'error' => true,
                'message' => ['Le groupe exposent n\'existe pas']
            ];
        }

        if($exponent->exponent_members()->count()>0){
            return [
                'error' => true,
                'message' => ['Le groupe exposant contient plusieurs membres! Veuillez supprimer d\'abord les membres auxquels il est lié']
            ];
        }

        $exponent->delete();

        return [
            'error' => false,
            'exponent' => $exponent
        ];
    }

    public function addImage(Request $request){

        $validator = Validator::make($request->all(),[
            'exponent_id' => 'required|exists:partners,id',
            'image' => 'required|image|max:3600'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $exponent = Exponent::where('id', $request->input('exponent_id'))->first();
        $oldImage = "";

        $imageName = $request->file('image')->getClientOriginalName();
        $imageName = uniqid().'_'.$imageName;
        $path = 'uploads'.DIRECTORY_SEPARATOR.'exponent'.DIRECTORY_SEPARATOR.'profile'.DIRECTORY_SEPARATOR;
        $destinationPath = PartnerController::p_path($path);
        // $f = new Filesystem();
        // $f->makeDirectory($destinationPath, 0777, true, true);
        $request->file('image')->move($destinationPath, $imageName);

        $oldImage = $exponent->image;
        $exponent->image = $path.$imageName;
        $exponent->save();
        //Vérifier si le partenaire a déjà une image si oui garder son nom pour le supprimer après
        if(!empty($oldImage)){
            $f = new Filesystem();
            $f->delete(ParticipantController::p_path($oldImage));
        }


        return [
            'path' => $path.$imageName,
            'imageName' => $imageName
        ];
    }
}