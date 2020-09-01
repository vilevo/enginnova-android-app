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


Route::group(['middleware' => ['verify.token']], function () use ($router) {
    Route::post('users/sync/create', "UserSynchronisationController@syncCreate");
    Route::post('users/sync/update', "UserSynchronisationController@syncUpdate");
    Route::post('users/sync/email/confirmed', "UserSynchronisationController@syncEmailConfirmed");

    $router->group(['middleware' => ['cors']], function () use ($router) {

        // Useful filter
        Route::group(['prefix' => 'filter'], function () {
            Route::get('jobs/{job}', 'ParticipantController@filterJob');
            Route::get('quarters/{quarter}', 'ParticipantController@filterQuarter');
            Route::get('enterprises/{enterprise}', 'ParticipantController@filterEnterprise');
            Route::get('interests/{interest}', 'ParticipantController@filterInterest');
            Route::get('competencies/{competency}', 'ParticipantController@filterCompetency');
        });

        Route::group(['prefix' => 'posts'], function () {
            Route::get('', 'PostController@index');
            Route::post('search', "PostController@search");
        });

        Route::group(['prefix' => 'annonces'], function () {
            Route::get('', 'AnnonceController@index');
            Route::post('search', "AnnonceController@search");
        });

        // Participant
        $router->group(['prefix' => 'participants'], function () use ($router) {

            $router->get('/', 'ParticipantController@index');
            $router->post('/login', 'ParticipantController@login');
            $router->get('{id}', 'ParticipantController@show');
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
            $router->post('/edit/{id}', 'ParticipantController@edit');
            $router->delete('{id:[0-9]+}', 'ParticipantController@delete');
            $router->post('competencies/delete', 'ParticipantController@removeCompetenciesToParticipant');
            $router->post('interests/delete', 'ParticipantController@removeInterestsToParticipant');
            $router->post('unsubscribe', 'ParticipantController@delete');
            $router->get('/get/populars', 'ParticipantController@populars');
            $router->get('/get/news', 'ParticipantController@newMembers');
            $router->get('/{id}/participations', 'ParticipantController@participations');
            $router->get('/{id}/conversations/with/{other}', 'ParticipantController@conversationsBetween');
            $router->post('/conversations/send/text', 'ParticipantController@sendTextMessageInConversation');
            $router->get('{id}/conversations/recent/messages', 'ParticipantController@recentsMessages');
            $router->get('{id}/conversations/{conv}/read', 'ParticipantController@readAllMessageInConversation');

            $router->post('/email/checked', 'ParticipantController@emailChecked');

            
        });


        // Search
        $router->group(['prefix' => 'search'], function () use ($router) {
            $router->post('/participants', [
                'as' => 'search.participant',
                'uses' => 'SearchController@participants'
            ]);
            $router->get('{id}', [
                'as' => 'votes.show',
                'uses' => 'VoteController@showVoteForCandidat'
            ]);
            $router->post('add', [
                'as' => 'votes.create',
                'uses' => 'VoteController@AddVote'
            ]);
            $router->post('remove', [
                'as' => 'votes.remove',
                'uses' => 'VoteController@RemoveVote'
            ]);
        });


        // Competency
        $router->group(['prefix' => 'competencies'], function () use ($router) {
            $router->get('/{value}', 'CompetencyController@list');
        });

        // Interest
        $router->group(['prefix' => 'interests'], function () use ($router) {
            $router->get('/{value}', 'InterestController@list');
        });


        // Redirections to social enginnova 
        Route::post('redirect/posts', "UserRedirectController@redirectPost");
        Route::post('redirect/annonces', "UserRedirectController@redirectAnnonce");
        Route::post('redirect/participants', "UserRedirectController@redirectShowParticipant");
    });
});
