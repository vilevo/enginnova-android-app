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


Route::get('/', function ()  {
    return 'Welcome to Fenes API!';
});

Route::group(['prefix' => 'admin'], function ()  {
    Route::post('token', [
        'as' => 'admin.token',
        'uses' => 'UserController@token',
    ]);

    Route::post('userrs', [
        'as' => 'admin.create',
        'uses' => 'UserController@create',
    ]);

    //Route::post('refresh/{id}', 'UserController@refresh');
});


Route::group(['middleware' => ['verify.token']], function ()  {
    Route::post('users/sync/create', "UserSynchronisationController@syncCreate");
    Route::post('users/sync/update', "UserSynchronisationController@syncUpdate");
    Route::post('users/sync/email/confirmed', "UserSynchronisationController@syncEmailConfirmed");

    Route::group(['middleware' => ['cors']], function ()  {

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
        Route::group(['prefix' => 'participants'], function ()  {

            Route::get('/', 'ParticipantController@index');
            Route::post('/', 'ParticipantController@create');
            Route::post('/login', 'ParticipantController@login');

            Route::get('{id}', 'ParticipantController@show');
            Route::get('majExportFile', 'ParticipantController@exportToParticipant');
            Route::post('addImage', 'ParticipantController@addImage');
            Route::get('image/{id:[0-9]+}', 'ParticipantController@showImage');
            
            Route::post('searchByCompetencies', 'ParticipantController@searchByCompetencies');
            Route::post('searchByInterest', 'ParticipantController@searchByInterest');
            Route::post('searchByQuarter', 'ParticipantController@searchByQuarter');
            Route::post('searchByEnterprise', 'ParticipantController@searchByEnterprise');
            Route::post('searchByJob', 'ParticipantController@searchByJob');
            Route::post('addCompetencies', 'ParticipantController@addCompetenciesToParticipant');
            Route::post('addInterests', 'ParticipantController@addInterestsToParticipant');
            Route::post('/edit/{id}', 'ParticipantController@edit');
            Route::delete('{id:[0-9]+}', 'ParticipantController@delete');
            Route::post('competencies/delete', 'ParticipantController@removeCompetenciesToParticipant');
            Route::post('interests/delete', 'ParticipantController@removeInterestsToParticipant');
            Route::post('unsubscribe', 'ParticipantController@delete');
            Route::get('/get/populars', 'ParticipantController@populars');
            Route::get('/get/news', 'ParticipantController@newMembers');
            Route::get('/{id}/participations', 'ParticipantController@participations');
            Route::get('/{id}/conversations/with/{other}', 'ParticipantController@conversationsBetween');
            Route::post('/conversations/send/text', 'ParticipantController@sendTextMessageInConversation');
            Route::get('{id}/conversations/recent/messages', 'ParticipantController@recentsMessages');
            Route::get('{id}/conversations/{conv}/read', 'ParticipantController@readAllMessageInConversation');

            Route::post('/email/checked', 'ParticipantController@emailChecked');

            
        });


        // Search
        Route::group(['prefix' => 'search'], function ()  {
            Route::post('/participants', [
                'as' => 'search.participant',
                'uses' => 'SearchController@participants'
            ]);
            Route::get('{id}', [
                'as' => 'votes.show',
                'uses' => 'VoteController@showVoteForCandidat'
            ]);
            Route::post('add', [
                'as' => 'votes.create',
                'uses' => 'VoteController@AddVote'
            ]);
            Route::post('remove', [
                'as' => 'votes.remove',
                'uses' => 'VoteController@RemoveVote'
            ]);
        });


        // Competency
        Route::group(['prefix' => 'competencies'], function ()  {
            Route::get('/{value}', 'CompetencyController@list');
        });

        // Interest
        Route::group(['prefix' => 'interests'], function ()  {
            Route::get('/{value}', 'InterestController@list');
        });


        // Redirections to social enginnova 
        Route::post('redirect/posts', "UserRedirectController@redirectPost");
        Route::post('redirect/annonces', "UserRedirectController@redirectAnnonce");
        Route::post('redirect/participants', "UserRedirectController@redirectShowParticipant");
    });
});
