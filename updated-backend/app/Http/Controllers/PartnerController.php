<?php

namespace App\Http\Controllers;

use App\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class PartnerController extends Controller
{

    public function index(){
        $partners = Partner::paginate(20);

        return $partners;
    }

    public function addImage(Request $request){

        $validator = Validator::make($request->all(),[
            'partner_id' => 'required|exists:partners,id',
            'image' => 'required|image|max:3600'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $partner = Partner::where('id', $request->input('partner_id'))->first();
        $oldImage = "";

        $imageName = $request->file('image')->getClientOriginalName();
        $imageName = uniqid().'_'.$imageName;
        $path = 'uploads'.DIRECTORY_SEPARATOR.'partner'.DIRECTORY_SEPARATOR.'profile'.DIRECTORY_SEPARATOR;
        $destinationPath = PartnerController::p_path($path);
        // $f = new Filesystem();
        // $f->makeDirectory($destinationPath, 0777, true, true);
        $request->file('image')->move($destinationPath, $imageName);

        $oldImage = $partner->image;
        $partner->image = $path.$imageName;
        $partner->save();
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



    public function show($id){
        $partner = Partner::find($id);

        if($partner == null){
            return [
                'error' => true,
                'message' => ['Le partenaire n\'existe pas']
            ];
        }

        return [
            'error' => false,
            'partner' => $partner
        ];
    }

    public function create(Request $request){
        // validate data
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'city' => 'required',
            'email' => 'required|email',
            'description' => 'required'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $partner = new Partner();
        $partner->name = $request->input('name');
        $partner->city = $request->input('city');
        $partner->description = $request->input('description');
        $partner->email = $request->input('email');
        $partner->phone_number = $request->input('phone_number');

        $partner->save();

        return [
            'error' => false,
            'partner' => $partner
        ];
    }

    public function edit(Request $request, $id){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'city' => 'required',
            'email' => 'required|email',
            'description' => 'required'
        ]);

        if($validator->fails()){
            return array('error' => true,
                         'message' => $validator->errors()->all());
        }

        $partner = Partner::find($id);
        if($partner==null){
            return [
                'error' => true,
                'partner' => $partner,
                'message' => ['Le partenaire n\'existe pas']
            ];
        }

        $partner->name = $request->input('name');
        $partner->city = $request->input('city');
        $partner->description = $request->input('description');
        $partner->email = $request->input('email');
        $partner->phone_number = $request->has('phone_number')?$request->input('phone_number'):$partner->phone_number;

        $partner->save();

        return [
            'error' => false,
            'partner' => $partner
        ];
    }

    public function delete($id){
        $partner = Partner::find($id);

        if($partner==null){
            return [
                'error' => true,
                'message' => ['Le partenaire n\'existe pas']
            ];
        }

        $partner->delete();

        return [
            'error' => false,
            'partner' => $partner
        ];
    }
}