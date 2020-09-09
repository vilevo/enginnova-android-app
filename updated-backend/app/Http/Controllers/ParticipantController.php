<?php

namespace App\Http\Controllers;

use App\CustomParticipant;
use App\Http\Controllers\Controller;
use App\Participant;
use App\Participants_deleted;
use App\Repositories\SocialEnginnova;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Musonza\Chat\Facades\ChatFacade;

/**
 * @group Participant management
 *
 * Apis for managing participants
 */
class ParticipantController extends Controller
{
    /**
     * Display a list of participant
     *
     * @response{
     *  "current_page": 1,
     *  "data": [
     *  {
     *  "id": 1,
     *  "last_name": "Doe",
     *  "first_name": "Joe",
     *  "key": 1452ERQER12AREAOW,
     *  "username": "jdoe",
     *  "email": "jdoe@mail.com",
     *  "birth_date": "14-05-1995",
     *  "linkedin": "https:www.linkedin.com/jdoe1425",
     *  "twitter": "",
     *  "facebook": "",
     *  "website": "www.jdoe.com",
     *  "phone_number": "99784512",
     *  "job": "Designer",
     *  "enterprise": "Enginnova",
     *  "biography": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo tenetur assumenda tempore esse voluptatem ipsam architecto error perspiciatis consectetur beatae praesentium, ut mollitia fuga modi aspernatur ullam. Ut, obcaecati!",
     *  "quarter": "Amoutiévé",
     *  "image": "145EALSAR
     *  }
     * ],
     * "first_page_url": "http://localhost/fenes_api/public/api/participants?page=1",
     * "from": 1,
     * "last_page": 2,
     * "last_page_url": "http://localhost/fenes_api/public/api/participants?page=1",
     * "next_page_url": "http://localhost/fenes_api/public/api/participants?page=2",
     * "path": "http://localhost/fenes_api/public/api/participants",
     * "per_page": 15,
     * "prev_page_url": null,
     * "to": 1,
     * "total": 2
     * }
     */
    public function index()
    {
        $participants = Participant::orderBy('first_name')->paginate(50);

        return $participants;
    }

    /**
     * Create a participant
     *
     * @bodyParam last_name string required Last name of participant
     * @bodyParam username string required Username of participant,
     * @bodyParam phone_number string required phone number of participant
     * @bodyParam job string required Job of participant
     * @bodyParam enterprise string required Where participant do his job
     * @bodyParam biography string Biography of participant
     * @bodyParam quarter string required Quarter where live participant
     * @bodyParam competencies array List of participant's competencies
     * @bodyParam image image required Profile image
     * @bodyParam first_name string First name of participant
     * @bodyParam birth_date date Birth date of participant Example: 14-05-1995,
     * @bodyParam email string required Email of participant
     * @bodyParam linkedin string Linkedin link of participant
     * @bodyParam twitter string Twitter link of participant
     * @bodyParam facebook string Facebook link of participant
     * @bodyParam website string Website of participant
     * @bodyParam interests array List of participant's interests
     *
     * @response{
     *  "error": false,
     *  "participant": "Object[Participant]",
     *  "competencies": "[{"id":1, "content":"Graphisme"}]",
     *  "interests": "[{"id":2, "content":"Design"}]"
     * }
     *
     * @response 404{
     *  "error": true,
     *  "message": []
     * }
     */
    public function create(Request $request, SocialEnginnova $socialEnginnova)
    {
        // validate data
        $validatedData = $request->validate([
            'email' => 'required|unique:participants',
            'password' => 'required'
        ]);

        $validatedData['password'] = bcrypt($request->password);


        $participant = Participant::create($validatedData);

        ParticipantController::addCompetencies($participant, $request->input('competencies'));

        if (!is_null($request->input('interests'))) {
            ParticipantController::addInterests($participant, $request->input('interests'));
        }

        $image = $request->file("image");
        if (!is_null($image)) {
            $path = ParticipantController::image($image, $participant);
        }

        $res = $socialEnginnova->createUser("From App", $request->email, $request->password);

        $participant->enginnova_token = $res->token;
        $participant->enginnova_token_created_at = now();

        $participant->save();

        return [
            'error' => false,
            'participant' => $participant,
            // 'competencies' => $participant->competencies()->get(['content'])->pluck('content')->toArray(),
            // 'interests' => $participant->interests()->get(['content'])->pluck('content')->toArray(),
        ];
    }

    /**
     * Login the participant
     */
    public function  login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $participant = Participant::where('email', $request->input('email'))->first();

        // Check the password
        $passwordOk = true;

        if ($participant != null && $passwordOk) {
            // THe lazy loading is not active
            $participant->competencies = $participant->competencies;
            $participant->interests = $participant->interests;
            // $participant->competencies = $participant->competencies()->get(['content'])->pluck('content')->toArray();
            // $participant->interests = $participant->interests()->get(['content'])->pluck('content')->toArray();
            return $participant;
        }

        return response()->json([
            'error' => true,
            'message' => "Email ou mot de passe invalid"
        ], 400);
    }


    /**
     * Update export file with list of participant
     *
     */
    public function exportToParticipant()
    {

        $path = 'uploads' . DIRECTORY_SEPARATOR . 'export' . DIRECTORY_SEPARATOR;
        $destinationPath = ParticipantController::p_path($path);

        $participants = Participant::where('csv', 0)->get();
        $increment = 0;

        if (file_exists($destinationPath . DIRECTORY_SEPARATOR . 'increment.txt')) {
            $increment_file = fopen($destinationPath . DIRECTORY_SEPARATOR . 'increment.txt', 'r');

            $increment = (int) fgets($increment_file);

            fclose($increment_file);
        }

        $csv = fopen($destinationPath . DIRECTORY_SEPARATOR . 'users.csv', 'a');
        foreach ($participants as $participant) {

            $competencies = implode(" ", $participant->competencies()->get(['content'])->pluck('content')->toArray());
            fputcsv($csv, [
                ++$increment,
                $participant->id,
                $participant->last_name,
                $participant->first_name,
                $participant->username,
                $participant->email,
                $participant->phone_number,
                $participant->quarter,
                $participant->biography,
                $participant->job,
                $participant->enterprise,
                $competencies,
            ]);
            $participant->csv = true;
            $participant->save();
        }

        fclose($csv);

        $increment_file = fopen($destinationPath . DIRECTORY_SEPARATOR . 'increment.txt', 'w');
        fputs($increment_file, $increment);
        fclose($increment_file);

        return $increment;
    }

    /**
     * Search Participants by their competencies
     *
     * @bodyParam participant_id integer required Participant id
     * @bodyParam competencies string required Competencies separate by escape Example: "PHP Design"
     *
     * response{
     *  [
     *  {
     *  "id":3,
     *  "last_name": "Peggie Bogan",
     *  "first_name": null,
     *  "email": "altenwerth.kane@gmail.com"
     *  "username": "Pegbog",
     *  "phone_number": "92145023",
     *  "job": "etudiant",
     *  "enterprise": "IAI",
     *  "biography": "Similique sed dicta aut vitae voluptas omnis. Delectus qui consequuntur aut ipsa. Autem dolorem in neque tempora quia.",
     *  "quarter": "Agoé",
     *  "image": null,
     *  "competencies": ["PHP"],
     *  "interests": ["IA"]
     * }
     * ]
     * }
     */
    public function searchByCompetencies(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|integer',
            'competencies' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $random = rand(1, 10);

        $participants = DB::table('participants')->where('id', '<>', $request->input('participant_id'))
            ->inRandomOrder()
            ->take($random)
            ->get();

        return ParticipantController::BuildParticipantsResult($participants);
    }

    public function searchByJob(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|integer',
            'job' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $random = rand(1, 10);

        $participants = DB::table('participants')->where('id', '<>', $request->input('participant_id'))
            ->inRandomOrder()
            ->take($random)
            ->get();

        return ParticipantController::BuildParticipantsResult($participants);
    }

    public function searchByEnterprise(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|integer',
            'enterprise' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $random = rand(1, 10);

        $participants = DB::table('participants')->where('id', '<>', $request->input('participant_id'))
            ->inRandomOrder()
            ->take($random)
            ->get();

        return ParticipantController::BuildParticipantsResult($participants);
    }

    public function searchByQuarter(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|integer',
            'quarter' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $random = rand(1, 10);

        $participants = DB::table('participants')->where('id', '<>', $request->input('participant_id'))
            ->inRandomOrder()
            ->take($random)
            ->get();

        return ParticipantController::BuildParticipantsResult($participants);
    }

    public function searchByInterest(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|integer',
            'interest' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $random = rand(1, 10);

        $participants = DB::table('participants')->where('id', '<>', $request->input('participant_id'))
            ->inRandomOrder()
            ->take($random)
            ->get();

        return ParticipantController::BuildParticipantsResult($participants);
    }

    private static function BuildParticipantsResult($participants)
    {
        $result = [];

        foreach ($participants as $participant) {
            $custom_participant = new CustomParticipant();
            $custom_participant->id = $participant->id;
            $custom_participant->last_name = $participant->last_name;
            $custom_participant->first_name = $participant->first_name;
            $custom_participant->username = $participant->username;
            $custom_participant->email = $participant->email;
            $custom_participant->image = $participant->image;
            $custom_participant->quarter = $participant->quarter;
            $custom_participant->biography = $participant->biography;
            $custom_participant->phone_number = $participant->phone_number;
            $custom_participant->job = $participant->job;
            $custom_participant->enterprise = $participant->enterprise;
            $p = Participant::find($participant->id);
            $custom_participant->competencies = $p->competencies()->get(['content'])->pluck('content')->toArray();
            $custom_participant->interests = $p->interests()->get(['content'])->pluck('content')->toArray();

            $result[] = $custom_participant;
        }
        return $result;
    }

    /**
     * Edit a participant
     *
     * @queryParam key required The key of participant.
     *
     * @bodyParam last_name string required Last name of participant
     * @bodyParam first_name string First name of participant
     * @bodyParam username string required Username of participant,
     * @bodyParam birth_date date Birth date of participant Example: 14-05-1995,
     * @bodyParam email string required Email of participant
     * @bodyParam linkedin string Linkedin link of participant
     * @bodyParam twitter string Twitter link of participant
     * @bodyParam facebook string Facebook link of participant
     * @bodyParam website string Website of participant
     * @bodyParam phone_number string required phone number of participant
     * @bodyParam job string required Job of participant
     * @bodyParam enterprise string required Where participant do his job
     * @bodyParam biography string required Biography of participant
     * @bodyParam quarter string required Quarter where live participant
     *
     * @response{
     *  "error": false,
     *  "participant": "Object[Participant]"
     * }
     *
     * @response 404{
     *  "error": true,
     *  "message": []
     * }
     *
     */
    public function edit(Request $request, $id)
    {

        // validate data
        $validator = Validator::make($request->all(), [
            'last_name' => 'required|min:3',
            // 'username' => 'required|min:3|unique:participants',
            'job' => 'nullable',
            'enterprise' => 'nullable',
            'quarter' => 'nullable',
            'biography' => 'nullable',
            'phone_number' => 'nullable|max:20',

        ]);

        if ($validator->fails()) {

            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $participant = Participant::where('id', $id)->first();

        if ($participant == null) {
            return response()->json([
                'error' => true,
                'message' => ["Le participant n'existe pas"],
            ], 400);
        }

        $participant->last_name = $request->input("last_name");
        $participant->first_name = ($request->has("first_name") ? $request->input("first_name") : $participant->first_name);
        $participant->email = $request->input("email");
        $participant->username = $request->input("username");
        $participant->quarter = $request->input("quarter");
        $participant->biography = $request->input("biography");
        $participant->job = $request->input("job");
        $participant->enterprise = $request->input("enterprise");
        $participant->website = ($request->has("website") ? $request->input("website") : $participant->website);
        $participant->phone_number = ($request->has("phone_number") ? $request->input("phone_number") : $participant->phone_number);
        $participant->birth_date = ($request->has("birth_date") ? $request->input("birth_date") : $participant->birth_date);
        $participant->facebook = ($request->has("facebook") ? $request->input("facebook") : $participant->facebook);
        $participant->linkedin = ($request->has("linkedin") ? $request->input("linkedin") : $participant->linkedin);
        $participant->twitter = ($request->has("twitter") ? $request->input("twitter") : $participant->twitter);

        $participant->save();

        return [
            'error' => false,
            'participant' => $participant,
        ];
    }

    /**
     * Delete a participant with specific key
     *
     * @queryParam key required The key of participant.
     *
     * @response{
     *  "error": false,
     *  "participant": "Object[Participant]"
     * }
     *
     * @response 404{
     *  "error": true,
     *  "message": ["Le participant n'existe pas"]
     * }
     */
    public function delete(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|exists:participants,id',
        ]);

        $participant = Participant::where('id', $request->input('participant_id'))->first();

        if ($participant == null) {
            return  response()->json([
                'error' => true,
                'message' => ['Le participant n\'existe pas'],
            ], 400);
        }
        $p = new Participants_deleted();
        $p->last_name = $participant->last_name;
        $p->username = $participant->username;
        $p->email = $participant->email;
        $p->quarter = $participant->quarter;
        $p->phone_number = $participant->phone_number;
        $p->job = $participant->job;
        $p->enterprise = $participant->enterprise;
        $p->biography = $participant->biography;
        $p->created_at = $participant->created_at;
        $p->deleted_at = date('Y-m-d H:i:s', time());
        $p->id = $participant->id;
        $p->save();

        if (!empty($participant->image)) {
            Storage::delete($participant->image);
        }

        $participant->delete();

        return [
            'error' => false,
            'participant' => $participant,
        ];
    }

    /**
     * Show one participant with specific key
     *
     * @queryParam key required The key of participant.
     *
     * @response{
     *  "id": 1,
     *  "last_name": "Doe",
     *  "first_name": "Joe",
     *  "key": 1452ERQER12AREAOW,
     *  "username": "jdoe",
     *  "email": "jdoe@mail.com",
     *  "birth_date": "14-05-1995",
     *  "linkedin": "https:www.linkedin.com/jdoe1425",
     *  "twitter": "",
     *  "facebook": "",
     *  "website": "www.jdoe.com",
     *  "phone_number": "99784512",
     *  "job": "Designer",
     *  "enterprise": "Enginnova",
     *  "biography": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo tenetur assumenda tempore esse voluptatem ipsam architecto error perspiciatis consectetur beatae praesentium, ut mollitia fuga modi aspernatur ullam. Ut, obcaecati!",
     *  "quarter": "Amoutiévé",
     *  "image": "145EALSAR
     * }
     *
     * @response 404{
     *  "error": true,
     *  "message": ["Le participant n'existe pas"]
     * }
     */
    public function show($id)
    {
        $participant = Participant::find($id);

        if ($participant == null) {
            return response()->json([
                'error' => true,
                'message' => ['Le participant n\'existe pas'],
            ], 400);
        }


        $participant->competencies = $participant->competencies;
        $participant->interests = $participant->interests;

        return [
            'error' => false,
            'participant' => $participant,
            // 'competencies' => $participant->competencies()->get(['id', 'content']),
            // 'interests' => $participant->interests()->get(['id', 'content']),
        ];
    }


    /**
     * Filter the the job
     */
    public function filterJob($job)
    {
        $result = [];
        // $filter = DB::select("select DISTINCT job from participants where job LIKE '%" . $job. "%' limit 50");


        $filter = DB::select("select DISTINCT job from participants where job LIKE '%" . $job . "%'
        
        ORDER BY (CASE WHEN job= '" . $job . "' THEN 1 WHEN job LIKE '" . $job . "%' THEN 2 ELSE 3 END)
        limit 50");


        if (empty($filter)) {
            $filter = DB::select("select DISTINCT job from participants where 1 limit 50");
        }
        foreach ($filter as $key => $value) {
            $result[] = $value->job;
        }
        return $result;
    }

    /**
     * Filter the the quarter
     */
    public function filterQuarter($quarter)
    {
        $result = [];
        // $filter = DB::select("select DISTINCT quarter from participants where quarter LIKE '%" . $quarter. "%' limit 50");

        $filter = DB::select("select DISTINCT quarter from participants where quarter LIKE '%" . $quarter . "%'
        
        ORDER BY (CASE WHEN quarter= '" . $quarter . "' THEN 1 WHEN quarter LIKE '" . $quarter . "%' THEN 2 ELSE 3 END)
        limit 50");

        if (empty($filter)) {
            $filter = DB::select("select DISTINCT quarter from participants where 1 limit 50");
        }

        foreach ($filter as $key => $value) {
            $result[] = $value->quarter;
        }
        return $result;
    }

    /**
     * Filter the the enterprise
     */
    public function filterEnterprise($enterprise)
    {
        $result = [];
        // $filter = DB::select("select DISTINCT enterprise from participants where enterprise LIKE '%" . $enterprise. "%' limit 50");

        $filter = DB::select("select DISTINCT enterprise from participants where enterprise LIKE '%" . $enterprise . "%'
        
        ORDER BY (CASE WHEN enterprise= '" . $enterprise . "' THEN 1 WHEN enterprise LIKE '" . $enterprise . "%' THEN 2 ELSE 3 END)
        limit 50");

        if (empty($filter)) {
            $filter = DB::select("select DISTINCT enterprise from participants where 1 limit 50");
        }
        foreach ($filter as $key => $value) {
            $result[] = $value->enterprise;
        }
        return $result;
    }

    /**
     * Filter the the Interests
     */
    public function filterInterest($interest)
    {
        $result = [];
        // $filter = DB::select("select DISTINCT content from interests where content LIKE '%" . $interest. "%' limit 50");

        $filter = DB::select("select DISTINCT content from interests where content LIKE '%" . $interest . "%'
        
        ORDER BY (CASE WHEN content= '" . $interest . "' THEN 1 WHEN content LIKE '" . $interest . "%' THEN 2 ELSE 3 END)
        limit 50");

        if (empty($filter)) {
            $filter = DB::select("select DISTINCT content from interests where 1 limit 50");
        }
        foreach ($filter as $key => $value) {
            $result[] = $value->content;
        }
        return $result;
    }

    /**
     * Filter the the Compentency
     */
    public function filterCompetency($competency)
    {
        $result = [];
        $filter = DB::select("select DISTINCT content from competencies where content LIKE '%" . $competency . "%'
        
        ORDER BY (CASE WHEN content= '" . $competency . "' THEN 1 WHEN content LIKE '" . $competency . "%' THEN 2 ELSE 3 END)
        limit 50");
        if (empty($filter)) {
            $filter = DB::select("select DISTINCT content from competencies where 1 limit 50");
        }
        foreach ($filter as $key => $value) {
            $result[] = $value->content;
        }
        return $result;
    }


    public static function addCompetencies($participant, $competencies)
    {

        if (!is_array($competencies)) {
            return;
        }
        foreach ($competencies as $value) {

            Participant::addCompetenciesToParticipant($participant, $value);
        }
    }

    public static function addInterests($participant, $interests)
    {
        foreach ($interests as $value) {

            Participant::addInterestToParticipant($participant, $value);
        }
    }

    /**
     * Add competencies to participant
     *
     * @bodyParam participant_key string required Key of participant
     * @bodyParam competencies array required List of Competencies of participants
     *
     *
     * @response{
     *  "error": false,
     *  "message": ["Succès"]
     * }
     *
     * @response 404{
     *  "error": true,
     *  "message": []
     * }
     *
     */
    public function addCompetenciesToParticipant(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|exists:participants,id',
            'competencies' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $participant = Participant::where("id", $request->input("participant_id"))->first();

        $competencies = $request->input('competencies');

        ParticipantController::addCompetencies($participant, $competencies);

        return [
            'error' => false,
            'message' => [
                'Succès',
            ],
        ];
    }

    /**
     * Add interests to participant
     *
     * @bodyParam participant_key string required Key of participant
     * @bodyParam interests array required List of interests of participants
     *
     *
     * @response{
     *  "error": false,
     *  "message": ["Succès"]
     * }
     *
     * @response 404{
     *  "error": true,
     *  "message": []
     * }
     *
     */
    public function addInterestsToParticipant(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|exists:participants,id',
            'interests' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $participant = Participant::where("id", $request->input('participant_id'))->first();
        $interests = $request->input('interests');

        ParticipantController::addInterests($participant, $interests);

        return [
            'error' => false,
            'message' => [
                'Succès',
            ],
        ];
    }

    /**
     * Remove interests to participant
     *
     * @bodyParam participant_key string required Key of participant
     * @bodyParam interests array required List of interests of participants
     *
     *
     * @response{
     *  "error": false,
     *  "message": ["Succès"]
     * }
     *
     * @response 404{
     *  "error": true,
     *  "message": []
     * }
     *
     */
    public function removeInterestsToParticipant(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|exists:participants,id',
            'interests' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $participant = Participant::where("id", $request->input('participant_id'))->first();
        $interests = $request->input('interests');

        foreach ($interests as $value) {

            Participant::removeInterestToParticipant($participant, $value);
        }

        return [
            'error' => false,
            'message' => [
                'Succès',
            ],
        ];
    }

    /**
     * Remove competencies to participant
     *
     * @bodyParam participant_key string required Key of participant
     * @bodyParam competencies array required List of Competencies of participants
     *
     *
     * @response{
     *  "error": false,
     *  "message": ["Succès"]
     * }
     *
     * @response 404{
     *  "error": true,
     *  "message": []
     * }
     *
     */
    public function removeCompetenciesToParticipant(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|exists:participants,id',
            'competencies' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $participant = Participant::where("id", $request->input('participant_id'))->first();
        $competencies = $request->input('competencies');

        foreach ($competencies as $value) {
            Participant::removeCompetenciesToParticipant($participant, $value);
        }

        return [
            'error' => false,
            'message' => [
                'Succès',
            ],
        ];
    }

    /**
     * Upload Image for participant
     *
     * @bodyParam participant_key string required The key of participant
     * @bodyParam image image required Image of participant
     *
     * @response{
     *  "image": "http://localhost/fenes_api/public/participant/image.png"
     * }
     *
     * @response 404{
     *  "error": true,
     *  "message": []
     * }
     *
     */
    public function addImage(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|exists:participants,id',
            'image' => 'required',
            'ext' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(array(
                'error' => true,
                'message' => $validator->errors()->all()
            ), 400);
        }

        $participant = Participant::where('id', $request->input('participant_id'))->first();

        $path = ParticipantController::storeBase64($request->image, $request->ext, $participant);

        return [
            'image' => $path,
        ];
    }

    /**
     * Return an image for the specified participant
     */
    public function showImage($id)
    {
        dd(2222);
        $p = Participant::findOrFail($id);

        // $type = 'image/png';
        // $headers = ['Content-Type' => $type];
        // $path = $p->image;

        // $response = new BinaryFileResponse($path, 200, $headers);

        if (Storage::exists($p->image)) {
            return Storage::download($p->image);
        }

        return Storage::download("storage/participant/default_profil.png");

        // return response()->json(array('error' => true,
        //         'message' => "Le fichier demander nexiste pas"), 400);

    }

    /**
     * Store bas64 image for the user
     */
    public static function storeBase64($base64Image, $extension, $participant)
    {
        $oldImage = $participant->image;

        $image = $base64Image; // your base64 encoded
        $image = str_replace('data:image/' . $extension . ';base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = SocialEnginnova::randomString() . "-" . $participant->id . '.' . $extension;
        $path = 'storage/participant/profile/' . $imageName;
        Storage::put($path, base64_decode($image));
        $participant->image = $path;
        $participant->save();

        if ($oldImage) {
            // Storage::delete($oldImage);
            Storage::move($oldImage, 'deleted/' . $oldImage);
        }

        return $path;
    }

    /**
     *
     */
    public static function image($image, $participant)
    {
        $oldImage = "";

        $path = 'storage/app/' . $image->store('participant/profile');

        $oldImage = $participant->image;
        $participant->image = $path;
        $participant->save();

        // Vérifier si le participant a déjà une image si oui garder son nom pour le supprimer après

        if (!empty($oldImage)) {
            Storage::delete($oldImage);
        }

        return $path;
    }

    public static function p_path($path = null)
    {

        return rtrim(app()->basePath('public_html' . DIRECTORY_SEPARATOR . $path), DIRECTORY_SEPARATOR);
    }

    // public function list_bot()
    // {
    //     $participants = Participant::paginate(50);

    //     return $participants;
    // }

    // public function participant_bot($key){
    //     $participant = Participant::where('key', $key)->first();

    //     if($participant == null){
    //         return [
    //             'error' => true,
    //             'participant' => $participant,
    //             'message' => ['Le participant n\'existe pas']
    //         ];
    //     }

    //     return [
    //         'error' => false,
    //         'participant' => $participant,
    //         'competencies' => $participant->competencies()->get(['content'])->pluck('content')->toArray(),
    //         'interests' => $participant->interests()->get(['content'])->pluck('content')->toArray()
    //     ];
    // }


    public function populars()
    {
        return Participant::query()->withCount('competencies')->withCount('interests')->orderBy('competencies_count', 'desc')->orderBy('interests_count', 'desc')->take(14)->get();
    }

    public function newMembers()
    {
        return Participant::query()->withCount('competencies')->withCount('interests')->latest()->take(14)->get();
    }

    public function participations($id)
    {
        return Participant::query()->latest()->take(7)->get();
    }


    public function conversationsBetween($id, $other)
    {

        $errors = collect();

        $from = Participant::find($id);
        $to = Participant::find($other);
        if ($from == null) {
            $errors[] = ['message' => "Le sender " . $id . " n'existe pas"];
        }

        if ($to == null) {
            $errors[] = ['message' => "Le receiver " . $id . " n'existe pas"];
        }

        if ($errors->isNotEmpty()) {
            return response()->json(array('error' => true, $errors), 400);
        }

        $conversation = ChatFacade::conversations()->between($from, $to);



        if ($conversation == null) {
            $participants = [$from, $to];
            $conversation = ChatFacade::createConversation($participants)->makeDirect();
        }

        $messages = $conversation->messages->map(function ($msg) {
            return [
                'id' => $msg->id,
                'type' => $msg->type,
                'body' => $msg->body,
                'date' => $msg->created_at,
                'sender_id' => $msg->sender->id
            ];
        });

        return [
            'id' => $conversation->id,
            'messages' => $messages
        ];
    }

    function sendTextMessageInConversation(Request $request)
    {
        $conversation = ChatFacade::conversations()->getById($request->id);
        if ($conversation == null) {
            return response()->json(array('error' => true, ["La conversation " . $request->id . " n'existe pas"]), 400);
        }

        $participant = Participant::find($request->sender_id);
        if ($participant == null) {
            return response()->json(array('error' => true, ["Le participant " . $request->sender_id . " n'existe pas"]), 400);
        }

        $message = ChatFacade::message($request->text)
            ->from($participant)
            ->to($conversation)
            ->send();

        return [
            'id' => $message->id
        ];
    }


    // Chat::conversations()->setParticipant($participantModel)->limit(25)->page(1)->get();

    function recentsMessages($id)
    {

        $participant = Participant::find($id);
        if ($participant == null) {
            return response()->json(array('error' => true, ["Le participant " . $id . " n'existe pas"]), 400);
        }

        $messages = ChatFacade::conversations()->setParticipant($participant)->limit(25)->page(1)->get();



        $formated = [];

        foreach ($messages->items() as $index => $participation) {



            $msg = $participation->conversation->messages()->latest()->limit(1)->get()->first();





            if ($msg) {
                // Find the second participant
                $to = null;
                foreach ($participation->conversation->getParticipants() as $key => $p) {
                    if ($p->id != $msg->sender->id) {
                        $to = $p;
                        break;
                    }
                }
                $formated[] = [
                    'unread_count' => ChatFacade::conversation($participation->conversation)->setParticipant($participant)->unreadCount(),
                    'last_message' => [
                        'id' => $msg->id,
                        'type' => $msg->type,
                        'body' => $msg->body,
                        'date' => $msg->created_at,
                        'receiver_id' => $to->id,
                    ],
                    'participation_id' => $participation->conversation->id,
                    'conversation_id' => $participation->id,
                    'from_last_name' => $msg->sender->last_name,
                    'from_first_name' => $msg->sender->first_name,
                    'from_email' => $msg->sender->email,
                    'from_id' => $msg->sender->id,
                    'is_sender' => $msg->sender->id == $participant->id
                ];
            }
        }

        // dd($formated);

        return $formated;
    }


    function readAllMessageInConversation($id, $conv)
    {
        $participant = Participant::find($id);

        if ($participant == null) {
            return response()->json(array('error' => true, ["Le participant " . $id . " n'existe pas"]), 400);
        }

        $conversation = ChatFacade::conversations()->getById($conv);
        if ($conversation == null) {
            return response()->json(array('error' => true, ["La conversation " . $conv . " n'existe pas"]), 400);
        }

        // Mark a whole conversation as read
        ChatFacade::conversation($conversation)->setParticipant($participant)->readAll();

        return ['done'];
    }


    public function emailChecked(Request $request)
    {
        $participant = Participant::find($request->id);


        return response()->json([
            'checked' => true,
            'date' => now()
        ]);

        // return response()->json([
        //     'checked' => $participant->email_verified_at != null,
        //     'date' => $participant->email_verified_at
        // ]);
    }
}
