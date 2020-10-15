import { Injectable } from '@angular/core';
import { APIRouteService } from '../apiroute.service';
import { HttpClient } from '@angular/common/http';
import { Routes } from 'src/app/enumerations/routes.enum';
import { Observable, of, from, Subject } from 'rxjs';
import { MemberModel } from 'src/app/models/member-model';
import { map, finalize } from 'rxjs/operators';
import { UtilitiesService } from '../utilities.service';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { ImagesRetriverService } from '../ui/images-retriver.service';
import { AppInterceptorService } from '../http/app-interceptor.service';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';


@Injectable({
  providedIn: 'root'
})
export class CallBackendService {

  fileTransferObject: FileTransferObject;

  constructor(
    private routes: APIRouteService,
    private http: HttpClient,
    private utils: UtilitiesService,
    private file: File,
    private imageRetriever: ImagesRetriverService,
    private fileTransfer: FileTransfer
  ) {
    this.fileTransferObject = fileTransfer.create();
  }

  createParticipant(data: MemberModel): Observable<any> {

    const url = this.routes.get(Routes.POST_PARTICIPANT);

    const body = {
      email: data.email,
      password: data.password
    };

    return this.http.post(url, body, { observe: 'response' });
  }

  login(data) {
    console.log('Login the user');
    console.log(data);
    const url = this.routes.get(Routes.POST_LOGIN_PARTICIPANT);

    const body = data;

    return this.http.post(url, body, { observe: 'response' });
  }

  getParticipants(page): Observable<MemberModel[]> {
    console.log('Get participants page : ' + page);

    const url = this.routes.get(Routes.GET_PARTICIPANTS, {
      page
    });

    return this.http.get<any>(url, { observe: 'response' })
      .pipe(
        map(response => this.utils.toListMemberModel(response.body))
      );
  }

  getParticipant(id): Observable<MemberModel> {
    const url = this.routes.get(Routes.GET_PARTICIPANT_BY_ID, {
      id,
    });

    console.log('Get participant by id');


    console.warn('body.participant if you deploy');
    // body = body.participant;
    return this.http.get<any>(url, {
      headers: this.utils.getCacheHeader(),
      observe: 'response'
    })
      .pipe(
        map(response => this.utils.toMemberModel(response.body.participant))
      );
  }

  editParticipant(data: MemberModel): Observable<any> {
    const url = this.routes.get(Routes.POST_EDIT_PARTICIPANT, {
      id: data.id
    });
    const body = this.utils.toBody(data);
    return this.http.post(url, body, { observe: 'response' })
      .pipe(
        map(response => response.body),
      );
  }

  addCompetencies(id, competencies: Array<string>): Observable<any> {
    const url = this.routes.get(Routes.POST_COMPETENCY_PARTICIPANT, {
      id
    });

    return this.http.post(url, {
      participant_id: id,
      competencies
    }, { observe: 'response' })
      .pipe(
        map(response => response.body),
      );
  }

  removeCompetencies(id, competencies: Array<string>): Observable<any> {
    const url = this.routes.get(Routes.POST_DELETE_COMPETENCY_PARTICIPANT, {
      id
    });
    return this.http.post(url, {
      participant_id: id,
      competencies
    })
      .pipe(
        map(response => response)
      );
  }

  addInterest(id, interests: Array<string>): Observable<any> {
    const url = this.routes.get(Routes.POST_INTEREST_PARTICIPANT, {
      id
    });

    return this.http.post(url, {
      participant_id: id,
      interests
    }, { observe: 'response' })
      .pipe(
        map(response => response.body),
      );
  }

  removeInterests(id, interests: Array<string>): Observable<any> {
    const url = this.routes.get(Routes.POST_DELETE_INTEREST_PARTICIPANT, {
      id
    });
    return this.http.post(url, {
      participant_id: id,
      interests
    })
      .pipe(
        map(response => response)
      );
  }

  popularParticipants() {
    const url = this.routes.get(Routes.GET_POPULARS_PARTICIPANTS);

    return this.http.get(url, {
      headers: this.utils.getCacheHeader(),
      observe: 'response'
    })
      .pipe(
        map(response => response.body)
      );
  }

  newParticipants() {
    const url = this.routes.get(Routes.GET_NEW_PARTICIPANTS);

    return this.http.get(url, {
      headers: this.utils.getCacheHeader(),
      observe: 'response'
    })
      .pipe(
        map(response => response.body)
      );
  }

  findCompetencies(arg: string) {
    const url = this.routes.get(Routes.GET_FILTERED_COMPETENCIES, {
      filter: arg
    });

    return this.http.get(url, {
      headers: this.utils.getCacheHeader(),
      observe: 'response'
    })
      .pipe(
        map(response => response.body)
      );
  }

  findInterests(arg: string) {
    const url = this.routes.get(Routes.GET_FILTERED_INTERESTS, {
      filter: arg
    });

    return this.http.get(url, {
      headers: this.utils.getCacheHeader(),
      observe: 'response'
    })
      .pipe(
        map(response => response.body)
      );
  }

  findWorks(arg) {
    const url = this.routes.get(Routes.GET_FILTERED_WORK, {
      filter: arg
    });

    return this.http.get(url, {
      headers: this.utils.getCacheHeader(),
      observe: 'response'
    })
      .pipe(
        map(response => response.body)
      );
  }

  findEnterprise(arg) {
    const url = this.routes.get(Routes.GET_FILTERED_ENTERPRISE, {
      filter: arg
    });

    return this.http.get(url, {
      headers: this.utils.getCacheHeader(),
      observe: 'response'
    })
      .pipe(
        map(response => response.body)
      );
  }

  findQuarter(arg) {
    const url = this.routes.get(Routes.GET_FILTERED_QUARTER, {
      filter: arg
    });

    return this.http.get(url, {
      headers: this.utils.getCacheHeader(),
      observe: 'response'
    })
      .pipe(
        map(response => response.body)
      );
  }


  getParticipations(id: number) {
    const url = this.routes.get(Routes.GET_PARTICIPANTS_PARTICIPATIONS, {
      id
    });

    return this.http.get(url, {
      headers: this.utils.getCacheHeader(),
      observe: 'response'
    })
      .pipe(
        map(response => response.body)
      );
  }


  downloadImage(id) {
    console.log('Downloading profil image from the server');
    const url = this.routes.imgRouteBase + id;
    return this.fileTransferObject.download(url, this.file.cacheDirectory + '/' + id).then((fileEntry: FileEntry) => {
      console.log('Profil image doenload finished');
      console.log(fileEntry.fullPath);
      return fileEntry.fullPath;
    });
  }


  makeSearch(id, competencies: Array<string>): Observable<any> {
    const url = this.routes.get(Routes.POST_SEARCH_BY_COMPETENCY);
    const body = {
      participant_id: id,
      competencies: this.stringfy(competencies)
    };

    return this.http.post(url, body, { observe: 'response' })
      .pipe(
        map(response => response.body),
      );
  }

  makeSearch2(id, search, type: 'participants' | 'posts' | 'annonces') {
    let url;

    if (type == 'participants') {
      url = this.routes.get(Routes.POST_SEARCH_PARTICIPANT);
    } else if (type == 'annonces') {
      url = this.routes.get(Routes.POST_SEARCH_ANNONCE);
    } else if (type == 'posts') {
      url = this.routes.get(Routes.POST_SEARCH_POST);
    }

    const body = {
      participant_id: id,
      search
    };

    return this.http.post(url, body, { observe: 'response' })
      .pipe(
        map(response => {
          if (type == 'participants') {
            return this.utils.toListMemberModel(response.body);
          }
          return response.body;
        }),
      );
  }

  async uploadImage(id, imagePath: string) {
    if (!imagePath) {
      return Promise.reject('Image path is null');
    }
    console.log('Prepare for image upload');
    console.log(imagePath);
    const s = imagePath.split('/');
    const useFul = s[s.length - 1];
    const fileName = useFul.split('?')[0];
    console.log(fileName);
    const fileType = fileName.split('.')[1];
    console.log('File type: ' + fileType);

    const contentType = 'image/' + fileType;

    let image = '';

    try {
      image = await this.imageRetriever.toBase64String(imagePath, fileType);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }

    console.log('Start Form data');
    const url = this.routes.get(Routes.POST_IMAGE_PARTICIPANT);


    return this.http.post(url, {
      image,
      participant_id: id,
      ext: fileType
    }, { observe: 'response' })
      .pipe(
        map(response => response.body),
      );
  }

  private stringfy(datas: Array<string>): string {
    let v = '';
    if (!datas) {
      return v;
    }

    datas.forEach((str) => {
      v = v + ' ' + str;
    });

    return v.trim();
  }

  private b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    return blob;
  }

  private upload(to, fileName, filePath, fileType, apiEndpoint) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      fileName,
      httpMethod: 'POST',
      params: {
        participant_id: to,
        ext: fileType
      },
      headers: {
        Authorization: AppInterceptorService.AUTHORIZATION
      }
    };

    console.log('SET FILE TRANSFERT UPLOAD');
    return this.fileTransferObject.upload(filePath, apiEndpoint, options, true);
  }


  /*****Conversations */
  conversationsBetween(fromT, to) {
    console.error({
      fromT,
      to
    })
    const url = this.routes.get(Routes.GET_PARTICIPANTS_CONVERSATIONS_WITH, {
      from: fromT,
      to
    });

    return this.http.get(url, { observe: 'body' })
      .pipe(
        map(response => response),
      );
  }

  sendTextMessageIn(conversationId, fromT, text, toId) {
    console.error("USE THIS METHODS TO SEND MESSAGES")
    const url = this.routes.get(Routes.POST_PARTICIPANTS_SEND_TEXT_MESSAGE);

    return this.http.post(url, {
      id: conversationId,
      sender_id: fromT,
      text,
      receiver_id: toId
    }, { observe: 'body' })
      .pipe(
        map(response => response),
      );
  }


  recentMessages(participantId) {
    const url = this.routes.get(Routes.GET_PARTICIPANTS_RECENT_MESSAGES, {
      id: participantId,
    });

    return this.http.get(url, { observe: 'body' });
    // .pipe(
    //   // map(response => response),
    // );
  }


  readAllMessageInConversation(participantId, conversationId) {
    const url = this.routes.get(Routes.GET_PARTICIPANTS_READ_ALL_MESSAGES, {
      id: participantId,
      conv: conversationId
    });

    return this.http.get(url, { observe: 'body' });
    // .pipe(
    //   // map(response => response),
    // );
  }


  posts(url, first = true) {
    if (first) {
      url = this.routes.get(Routes.GET_POSTS);
    }
    return this.http.get(url, { observe: 'body' });
  }

  annonces(url, first = true) {
    if (first) {
      url = this.routes.get(Routes.GET_ANNONCES);
    }
    return this.http.get(url, { observe: 'body' });
  }

  checkEmailConfirmed(user_id) {
    const url = this.routes.get(Routes.POST_EMAIL_CHECKED);
    return this.http.post(url, {
      id: user_id
    }, { observe: 'body' });
  }

  getPostUrl(id, user_id) {
    const url = this.routes.get(Routes.POST_POST_URL);
    return this.http.post(url, {
      id,
      user_id
    }, { observe: 'body' });
  }

  getAnnonceUrl(id, user_id) {
    const url = this.routes.get(Routes.POST_ANNONCE_URL);
    return this.http.post(url, {
      id,
      user_id
    }, { observe: 'body' });
  }

  getProfilUrl(from, to) {
    const url = this.routes.get(Routes.POST_OTHER_PROFIL);
    return this.http.post(url, {
      from,
      to
    }, { observe: 'body' });
  }

  getMyProfilUrl(from) {
    const url = this.routes.get(Routes.POST_MY_PROFIL);
    return this.http.post(url, {
      from,
    }, { observe: 'body' });
  }


}
