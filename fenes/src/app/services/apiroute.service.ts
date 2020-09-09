import { Injectable } from '@angular/core';
import { Routes } from '../enumerations/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class APIRouteService {

  private routes = [];
  private addCors = 'https://cors-anywhere.herokuapp.com/';
  public mainBase = 'https://app.enginnova.co/api';
  // private testBase = 'http://192.168.43.67:8000/';
  private testBase = 'http://localhost:8000/api';
  public base = /* this.addCors +  */ this.testBase;
  public routesBase = this.base + '';
  public imgRouteBase = this.base + '/participants/image/';


  constructor() {
    // this.routesBase = this.testBase;

    this.routes[Routes.GET_PARTICIPANT_BY_ID] = '/participants/{id}';
    this.routes[Routes.POST_PARTICIPANT] = '/participants';
    this.routes[Routes.POST_LOGIN_PARTICIPANT] = '/participants/login';
    this.routes[Routes.POST_EDIT_PARTICIPANT] = '/participants/edit/{id}';
    this.routes[Routes.GET_PARTICIPANTS] = '/participants?page={page}';
    this.routes[Routes.POST_INTEREST_PARTICIPANT] = '/participants/addInterests';
    this.routes[Routes.POST_COMPETENCY_PARTICIPANT] = '/participants/addCompetencies';
    this.routes[Routes.POST_DELETE_INTEREST_PARTICIPANT] = '/participants/interests/delete';
    this.routes[Routes.POST_DELETE_COMPETENCY_PARTICIPANT] = '/participants/competencies/delete';
    this.routes[Routes.POST_SEARCH_BY_COMPETENCY] = '/participants/searchByCompetencies';

    this.routes[Routes.POST_IMAGE_PARTICIPANT] = '/participants/addImage';
    this.routes[Routes.GET_FILTERED_COMPETENCIES] = '/filter/competencies/{filter}';
    this.routes[Routes.GET_FILTERED_INTERESTS] = '/filter/interests/{filter}';
    this.routes[Routes.GET_FILTERED_WORK] = '/filter/jobs/{filter}';
    this.routes[Routes.GET_FILTERED_QUARTER] = '/filter/quarters/{filter}';
    this.routes[Routes.GET_FILTERED_ENTERPRISE] = '/filter/enterprises/{filter}';
    this.routes[Routes.GET_POPULARS_PARTICIPANTS] = '/participants/get/populars';
    this.routes[Routes.GET_NEW_PARTICIPANTS] = '/participants/get/news';
    this.routes[Routes.GET_PARTICIPANTS_PARTICIPATIONS] = '/participants/{id}/participations';
    this.routes[Routes.GET_PARTICIPANTS_CONVERSATIONS_WITH] = '/participants/{from}/conversations/with/{to}';
    this.routes[Routes.POST_PARTICIPANTS_SEND_TEXT_MESSAGE] = '/participants/conversations/send/text';
    this.routes[Routes.GET_PARTICIPANTS_RECENT_MESSAGES] = '/participants/{id}/conversations/recent/messages';
    this.routes[Routes.GET_PARTICIPANTS_READ_ALL_MESSAGES] = '/participants/{id}/conversations/{conv}/read';
    this.routes[Routes.GET_POSTS] = '/posts';
    this.routes[Routes.GET_ANNONCES] = '/annonces';

    this.routes[Routes.POST_SEARCH_PARTICIPANT] = '/search/participants';
    this.routes[Routes.POST_SEARCH_POST] = '/posts/search';
    this.routes[Routes.POST_SEARCH_ANNONCE] = '/annonces/search';
    this.routes[Routes.POST_EMAIL_CHECKED] = '/participants/email/checked';
    this.routes[Routes.POST_MY_PROFIL] = '/redirect/participants';
    this.routes[Routes.POST_OTHER_PROFIL] = '/redirect/participants';
    this.routes[Routes.POST_POST_URL] = '/redirect/posts';
    this.routes[Routes.POST_ANNONCE_URL] = '/redirect/annonces';

  }

  get(name: Routes, params: object = null): string {
    console.error(params);
    let str = this.routes[name];
    if (params != null) {
      str = this.formatInicorn(str, params);
    }

    return this.routesBase + str;
  }

  private formatInicorn(str: string, values: object) {
    let key;

    for (key in values) {
      if (key) {
        str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), values[key]);
      }
    }

    return str;
  }
}

