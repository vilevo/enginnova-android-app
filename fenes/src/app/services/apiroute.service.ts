import { Injectable } from '@angular/core';
import { Routes } from '../enumerations/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class APIRouteService {

  private routes = [];
  private addCors = 'https://cors-anywhere.herokuapp.com/';
  public mainBase = 'https://apifenes.000webhostapp.com/api';
  // private testBase = 'http://192.168.43.67:8000/';
  private testBase = 'http://localhost:8000/api';
  private base = /*this.addCors + */ this.mainBase;
  public routesBase = this.testBase + '';
  public imgRouteBase = this.testBase + '/participants/image/';


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
  }

  get(name: Routes, params: object = null): string {
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

