import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { CallBackendService } from './api/call-backend.service';
import { map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MemberModel } from '../models/member-model';
import { HttpResponse } from '@angular/common/http';
import { StorageService } from './storage.service';
import { UtilitiesService } from './utilities.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  connected: MemberModel;
  avatarPath = '';
  downloadProfilImage = false;

  constructor(
    private backend: CallBackendService,
    private storage: StorageService,
    private utils: UtilitiesService,
    private webView: WebView,
    private router: Router,
  ) {
    this.getConnected().then(c => {
      if (this.connected.image) {
        backend.uploadImage(this.connected.id, this.connected.image);
      }
    });

    // let t = "aanng^geelloo";
    // const index = t.indexOf('^');
    // t = t.substring(0, index) + 'PNG' + t.substring(index + 1);
    // console.warn(t);
  }

  create(user: MemberModel): Observable<MemberModel> {
    return this.backend.createParticipant(user).pipe(
      tap(rep => {
        // Do something with the response
        let response: HttpResponse<any>;
        response = rep;
        console.log('My response body ');
        console.log(response.body);
        user.id = response.body.participant.id;
        // console.warn('Shame to you. You change the id');

        // user.id = 2;
        this.storage.storeConnected(user);
      }, error => {
        // Got an error, do something
        console.log(error);
        throwError(error);
      }),

      map(response => this.utils.toMemberModel(response.body)),
    );
  }

  /**
   * Login an user
   *
   * @param user informations the user must provide for authentification
   */
  login(email, password) {
    return this.backend.login({
      email,
      password
    }).pipe(
      map(member => {
        this.connected = this.utils.toMemberModel(member.body);
        // this.connected.id = member.body
        this.storage.storeConnected(this.connected);
        // Download the latest uploaded image
        this.downloadProfilImage = true;
        this.storage.addDownloadImagePlan();
        return this.connected;
      })
    );
  }

  /**
   * Logout the connected USER
   */
  logout(): boolean {
    // Remove all the connected user params
    this.storage.clearAll();
    this.connected = null;

    this.router.navigateByUrl('sign-up');

    // Redirect to signin page
    return true;
  }

  /**
   * Retrives information about the connected user
   */
  async getConnected(): Promise<MemberModel> {
    // this.connected = this.utils.fakeMember();
    this.connected = await this.storage.getConnected();
    return this.connected;
  }

  /**
   * Modify the connected user informations
   */
  updateConnected(user: MemberModel) {
    return this.backend.editParticipant(user).pipe(
      tap(rep => {
        // Do something with the response
        let response: HttpResponse<any>;
        response = rep;
        console.log('Update connected response body ');
        console.log(response);
        this.storage.storeConnected(user);
        this.connected = user;
      }, error => {
        // Got an error, do something
        console.log('Error! will retry later');
        throwError(error);
      }),

      map(response => 'ok'),
    );
  }

  /**
   * Add competency to the connected user
   */
  addCompetencies(competencies: Array<string>): Observable<string> {
    console.log('Add competencies');
    // competencies = this.newElement(this.connected.competencies, competencies);
    return this.backend.addCompetencies(this.connected.id, competencies).pipe(
      tap(rep => {
        // Do something with the response
        let response: HttpResponse<any>;
        response = rep;
        console.log('Add competency response body ');
        console.log(response);

        competencies.forEach(c => {
          if (this.connected.competencies.indexOf(c) < 0) {
            console.log('Add this new competency');
            console.log(c);
            this.connected.competencies.push(c);
          }
        });

        this.storage.storeConnected(this.connected);

      }, error => {
        // Got an error, do something
        console.log('Error! will retry later');
        throwError(error);
      }),

      map(response => 'ok'),
    );
  }

  /**
   * Remove a participant competencies
   */
  removeCompetencies(competencies: Array<string>): Observable<any> {
    console.log('Will remove competencies');
    return this.backend.removeCompetencies(this.connected.id, competencies)
      .pipe(
        tap(rep => {
          // Do something with the response
          let response: HttpResponse<any>;
          response = rep;
          console.log('Remove competency body');
          console.log(response);
          // this.storage.storeConnected(user);

          this.connected.competencies = this.connected.competencies.filter((value) => {
            return !(competencies.indexOf(value) >= 0);
          });
          console.log('The user new competencies');
          console.log(this.connected.competencies);

          this.storage.storeConnected(this.connected);

        }, error => {
          // Got an error, do something
          console.log('Error! will retry later');
          throwError(error);
        }),

        map(response => 'ok'),
      );
  }

  /**
   * Add interests to the connected user
   */
  addInterests(interests: Array<string>): Observable<string> {
    // interests = this.newElement(this.connected.interests, interests);
    return this.backend.addInterest(this.connected.id, interests).pipe(
      tap(rep => {
        // Do something with the response
        let response: HttpResponse<any>;
        response = rep;
        console.log('Add interests response body ');
        console.log(response);

        interests.forEach(c => {
          if (this.connected.interests.indexOf(c) < 0) {
            console.log('Add this new Interest');
            console.log(c);
            this.connected.interests.push(c);
          }
        });

        console.log('At the end  save the interests');
        console.log(this.connected.interests);
        this.storage.storeConnected(this.connected);

      }, error => {
        // Got an error, do something
        console.log('Error! will retry later');
        throwError(error);
      }),

      map(response => 'ok'),
    );
  }

  /**
   * Remove a participant interests
   */
  removeInterests(interests: Array<string>): Observable<any> {
    console.log('Will remove interests');
    return this.backend.removeInterests(this.connected.id, interests)
      .pipe(
        tap(rep => {
          // Do something with the response
          let response: HttpResponse<any>;
          response = rep;
          console.log('Remove interest body');
          console.log(response);
          // this.storage.storeConnected(user);

          this.connected.interests = this.connected.interests.filter((value) => {
            return !(interests.indexOf(value) >= 0);
          });
          console.log('The user new interests');
          console.log(this.connected.interests);

          this.storage.storeConnected(this.connected);

        }, error => {
          // Got an error, do something
          console.log('Error! will retry later');
          throwError(error);
        }),

        map(response => 'ok'),
      );
  }

  async storeAvatarPath(path: string): Promise<Observable<string>> {

    console.log('Upload the image');
    const ob = await this.backend.uploadImage(this.connected.id, path);
    // ob.subscribe();
    return ob.pipe(
      tap((response: HttpResponse<any>) => {
        // Do something with the response
        console.log('My response body ');
        console.log(response);
        // this.storage.storeConnected(user);
        this.storage.storeAvatar(path);
        this.avatarPath = path;
      }, error => {
        // Got an error, do something
        console.log('Error! will retry later');
        throwError(error);
      }),

      map(response => 'ok'),
    );
  }

  async getAvatarPath(): Promise<string> {
    const path = await this.storage.getAvatar();
    if (!path) {
      console.log('Nothing in the path');
      return Promise.reject('null');
    }
    return Promise.resolve(this.webView.convertFileSrc(path));
  }

  canRemoveCompetencies(competencies: Array<string>) {
    return this.utils.getNotSimilar(competencies, this.connected.competencies).length === 0;
  }

  canRemoveInterests(interests: Array<string>) {
    const r = this.connected.interests.filter((i) => {
      return interests.indexOf(i) >= 0;
    });
    return r.length !== 0;
  }

  async addIntrestedCompetency(competency: string) {
    this.storage.addIntrestedCompetency(competency);
  }

  public newElement(oldA = [], newA = []) {
    console.log(oldA);
    console.log(newA);
    console.log('NOt similar');
    console.log(this.utils.getNotSimilar(newA, oldA));
    return this.utils.getNotSimilar(newA, oldA);
  }
}
