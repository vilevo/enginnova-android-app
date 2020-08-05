import { Injectable } from '@angular/core';
import { MemberModel } from '../models/member-model';
import { UtilitiesService } from './utilities.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private user: MemberModel;
  // private storing = false;
  private toStore = null;

  constructor(
    private storage: Storage,
    private utils: UtilitiesService,
  ) { }

  clearAll() {
    this.storage.clear();
  }

  storeConnected(value: MemberModel) {
    console.log(value);
    this.toStore = value;
    if (value && !value.id) {
      throw new Error('Cannot store empty id');
    }
    console.log('Store the this user');
    console.log(value);
    return this.storage.set('connected', JSON.stringify(value))
      .then(_ => { console.log('OK'); this.toStore = null; })
      .catch(error => {
        console.log('Got an error while storing');
        console.log(error);
        this.toStore = null;
        return Promise.reject(error);
      });
  }

  async getConnected() {
    if (this.toStore != null) {
      console.log('Crazy to storing!!!!!!!!');
      return this.toStore;
    }
    console.log('Get the stored user');
    const memberString = await this.storage.get('connected');
    console.log(memberString);
    let c = JSON.parse(memberString);
    // c.id = 11;
    // c = this.utils.fakeMember();
    // this.storeConnected(c).then(value => {
    //   console.log('Stored ..... \n\n\n\n');
    //   console.log(value);
    // });
    console.log(c);
    return c;
  }

  storeAvatar(path) {
    return this.storage.set('avatar', path);
  }

  async getAvatar(): Promise<string> {
    return await this.storage.get('avatar');
  }

  /**
   * The number is the ID of a member
   */
  async loadRecentSearchResult(): Promise<Array<number>> {
    console.log('Loading the last result');
    const l = await this.storage.get('last_result_value');
    console.log(l);
    return (l == null ? [] : l);
  }

  /**
   * @param result an array of member id.
   */
  async persistResult(result: Array<number>) {
    console.log('Persit the last result');
    console.log(result);

    await this.storage.remove('last_result_value');

    return this.storage.set('last_result_value', result);

  }

  async addIntrestedCompetency(competency: string) {
    this.storage.get('interested_competencies').then((values: Array<string>) => {
      if (!values) {
        values = [];
      }
      // console.log(values.indexOf(competency));
      if (values.indexOf(competency) === -1) {
        values.push(competency);
        this.storage.set('interested_competencies', values);
      }
    });
  }

  addDownloadImagePlan() {
    return this.set('downloadProfilImage', true);
  }

  hasDownloadImagePlan() {
    return this.get('downloadProfilImage').then(v => {
      console.log('LLLLLLLAAAAAAAAAAA ' + v);
      return v;
    });
  }

  removeDownloadPlan() {
    return this.storage.set('downloadProfilImage', false);
  }

  set(key, value) {
    return this.storage.set(key, value);
  }

  get(key) {
    return this.storage.get(key);
  }
}
