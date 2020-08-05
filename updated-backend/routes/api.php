<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



$router->get('/', function () use ($router) {
    return 'Welcome to Fenes API!';
});

$router->group(['prefix' => 'admin'], function () use ($router) {
    $router->post('token', [
        'as' => 'admin.token',
        'uses' => 'UserController@token',
    ]);

    $router->post('userrs', [
        'as' => 'admin.create',
        'uses' => 'UserController@create',
    ]);

    //$router->post('refresh/{id}', 'UserController@refresh');
});

// $router->get('participant_bot/{key}', 'ParticipantController@participant_bot');
// $router->get('participant_bot', 'ParticipantController@list_bot');

//$router->get('/comp/{value}', 'CompetencyController@list');


// $router->get('/participants/image/{id:[0-9]+}', 'ParticipantController@showImage');

$router->group(['middleware' => [ 'cors']], function () use ($router) {

    // $router->group(['prefix' => 'api'], function () use ($router) {

        // Useful filter
        Route::group(['prefix' => 'filter'], function () {
            Route::get('jobs/{job}', 'ParticipantController@filterJob');
            Route::get('quarters/{quarter}', 'ParticipantController@filterQuarter');
            Route::get('enterprises/{enterprise}', 'ParticipantController@filterEnterprise');
            Route::get('interests/{interest}', 'ParticipantController@filterInterest');
            Route::get('competencies/{competency}', 'ParticipantController@filterCompetency');
        });

        // Participant
        $router->group(['prefix' => 'participants'], function () use ($router) {

            $router->get('/', 'ParticipantController@index');
            $router->post('/login', 'ParticipantController@login');
            $router->get('{id:[0-9]+}', 'ParticipantController@show');
            $router->get('majExportFile', 'ParticipantController@exportToParticipant');
            $router->post('addImage', 'ParticipantController@addImage');
            $router->get('image/{id:[0-9]+}', 'ParticipantController@showImage');
            $router->post('/', 'ParticipantController@create');
            $router->post('searchByCompetencies', 'ParticipantController@searchByCompetencies');
            $router->post('searchByInterest', 'ParticipantController@searchByInterest');
            $router->post('searchByQuarter', 'ParticipantController@searchByQuarter');
            $router->post('searchByEnterprise', 'ParticipantController@searchByEnterprise');
            $router->post('searchByJob', 'ParticipantController@searchByJob');
            $router->post('addCompetencies', 'ParticipantController@addCompetenciesToParticipant');
            $router->post('addInterests', 'ParticipantController@addInterestsToParticipant');
            $router->post('/edit/{id:[0-9]+}', 'ParticipantController@edit');
            $router->delete('{id:[0-9]+}', 'ParticipantController@delete');
            $router->post('competencies/delete', 'ParticipantController@removeCompetenciesToParticipant');
            $router->post('interests/delete', 'ParticipantController@removeInterestsToParticipant');
            $router->post('unsubscribe', 'ParticipantController@delete');
        });

        // Vote
        // $router->group(['prefix' => 'votes'], function() use ($router){
        //     $router->get('/', [
        //         'as' => 'votes.list',
        //         'uses' => 'VoteController@index'
        //     ]);
        //     $router->get('{id}', [
        //         'as' => 'votes.show',
        //         'uses' => 'VoteController@showVoteForCandidat'
        //     ]);
        //     $router->post('add', [
        //         'as' => 'votes.create',
        //         'uses' => 'VoteController@AddVote'
        //     ]);
        //     $router->post('remove', [
        //         'as' => 'votes.remove',
        //         'uses' => 'VoteController@RemoveVote'
        //     ]);
        // });

        // Competency
        $router->group(['prefix' => 'competencies'], function () use ($router) {
            $router->get('/{value}', 'CompetencyController@list');
            //     $router->get('{id:[0-9]+}', 'CompetencyController@show');
            //     $router->post('/', 'CompetencyController@create');
            //     $router->put('{id:[0-9]+}', 'CompetencyController@edit');
            //     $router->delete('{id:[0-9]+}', 'CompetencyController@delete');

        });

        // Interest
        $router->group(['prefix' => 'interests'], function () use ($router) {
            $router->get('/{value}', 'InterestController@list');
            //     $router->get('/', 'InterestController@index');
            //     $router->get('{id:[0-9]+}', 'InterestController@show');
            //     $router->post('/', 'InterestController@create');
            //     $router->put('{id:[0-9]+}', 'InterestController@edit');
            //     $router->delete('{id:[0-9]+}', 'InterestController@delete');

        });

        // // Exponent
        // $router->group(['prefix' => 'exponents_teams'], function() use ($router){
        //     $router->post('addImage', 'ExponentController@addImage');
        //     $router->get('/', 'ExponentController@index');
        //     $router->get('{id:[0-9]+}', 'ExponentController@show');
        //     $router->post('/', 'ExponentController@create');
        //     $router->put('{id:[0-9]+}', 'ExponentController@edit');
        //     $router->delete('{id:[0-9]+}', 'ExponentController@delete');
        // });

        // // Exponent_Member
        // $router->group(['prefix' => 'exponents_members'], function() use ($router){
        //     $router->get('/', 'ExponentMemberController@index');
        //     $router->get('{id:[0-9]+}', 'ExponentMemberController@show');
        //     $router->post('/', 'ExponentMemberController@create');
        //     $router->put('{id:[0-9]+}', 'ExponentMemberController@edit');
        //     $router->delete('{id:[0-9]+}', 'ExponentMemberController@delete');
        // });

        // // Partner
        // $router->group(['prefix' => 'partners'], function() use ($router){
        //     $router->post('addImage', 'PartnerController@addImage');
        //     $router->get('/', 'PartnerController@index');
        //     $router->get('{id:[0-9]+}', 'PartnerController@show');
        //     $router->post('/', 'PartnerController@create');
        //     $router->put('{id:[0-9]+}', 'PartnerController@edit');
        //     $router->delete('{id:[0-9]+}', 'PartnerController@delete');
        // });

        // // Candidat
        // $router->group(['prefix' => 'projects'], function() use ($router){
        //     $router->get('/', 'CandidateController@index');
        //     $router->get('{id:[0-9]+}', 'CandidateController@show');
        //     $router->post('/', 'CandidateController@create');
        //     $router->put('{id:[0-9]+}', 'CandidateController@edit');
        //     $router->delete('{id:[0-9]+}', 'CandidateController@delete');
        //     $router->get('votes/{id:[0-9]+}', 'CandidateController@getCandidateByVote');
        // });

        // // Candidat_Participant
        // $router->group(['prefix' => 'candidates'], function() use ($router){
        //     $router->get('/', 'CandidateParticipantController@index');
        //     $router->get('{id:[0-9]+}', 'CandidateParticipantController@show');
        //     $router->post('/', 'CandidateParticipantController@create');
        //     $router->put('{id:[0-9]+}', 'CandidateParticipantController@edit');
        //     $router->delete('{id:[0-9]+}', 'CandidateParticipantController@delete');
        // });

        // Planning
        // $router->get('plannings', 'PlanningController@index');
        // $router->get('plannings/{id}', 'PlanningController@show');
        // $router->post('plannings', 'PlanningController@create');
        // $router->put('plannings/{id}', 'PlanningController@edit');
        // $router->delete('plannings/{id}', 'PlanningController@delete');

    // });
});
