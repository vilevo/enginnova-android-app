import { CameraComponent } from './../camera/camera.component';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MemberModel } from 'src/app/models/member-model';
import { Router, NavigationStart } from '@angular/router';
import { ImagesRetriverService } from 'src/app/services/ui/images-retriver.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { APIRouteService } from 'src/app/services/apiroute.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { CallBackendService } from 'src/app/services/api/call-backend.service';
import { StorageService } from 'src/app/services/storage.service';
import { connected } from 'process';
@Component({
  selector: 'fenes-member-detail',
  templateUrl: './fenes-member-detail.component.html',
  styleUrls: ['./fenes-member-detail.component.scss'],
})
export class FenesMemberDetailComponent implements OnInit {

  @Input('member') member: MemberModel;
  @Input('editmode') editmode = false;

  @Output() showCamera = new EventEmitter(true);

  localImgPath;
  defaultImg = '/assets/user_1_.png';
  uploading;
  uploadError;

  constructor(
    private router: Router,
    private imageretriever: ImagesRetriverService,
    private webview: WebView,
    private user: UserService,
    private apiRoute: APIRouteService,
    private inAppBroswer: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private callNamber: CallNumber,
    private vibraton: Vibration,
    private backend: CallBackendService,
    private storage: StorageService,
    private server: APIRouteService,
    private modalController: ModalController
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/home') {
          console.log('Navigation start to home. update the avatar image');
          // this.updateAvatar();
          this.updateImage();
        }
      }
    });
  }

  updateAvatar() {
    try {
      if (this.editmode) {
        this.user.getAvatarPath().then((path) => {
          this.localImgPath = path;
          console.log('The avatar path ' + this.localImgPath);
        }).catch(() => {
          console.log('Got wrong path');
          // setTimeout(() => {
          this.localImgPath = this.defaultImg;
          // }, 1000);
        });
      }
    } catch (error) {
      console.log(error);
      // setTimeout(() => {
      this.localImgPath = this.defaultImg;
      // }, 1000);
    }
  }

  updateImage() {
    this.storage.hasDownloadImagePlan().then(d => {
      console.log(this.member);
      console.error(d);
      if (d == true) {
        console.log('DOWNLOAD  AVATAR ????????????????');
        this.downloadImage();
      } else {
        console.error('UPDATE AVATAR ????????????????');
        if (this.editmode) {
          this.updateAvatar();

        } else {
          if (this.member.image) {
            this.localImgPath = this.apiRoute.imgRouteBase + this.member.id;
          }
        }
      }
    });

  }

  ngOnInit() {
    // console.log(this.member);
    this.updateImage();
    // setTimeout(() => {
    //   this.updateNull();
    // }, 3000);
  }

  updateNull() {
    if (this.member) {
      if (this.member.facebook == null || this.member.facebook == 'null') {
        this.member.facebook = undefined;
      }
      if (this.member.twitter == null || this.member.twitter == 'null') {
        this.member.twitter = undefined;
      }
      if (this.member.linkedin == null || this.member.linkedin == 'null') {
        this.member.linkedin = undefined;
      }
      if (this.member.website == null || this.member.website == 'null') {
        this.member.website = undefined;
      }
      console.log('Null value changed');
      console.log(this.member);
    }
  }

  async downloadImage() {
    this.uploading = true;
    // setTimeout(() => {
    if (this.editmode) {
      this.member = await this.user.getConnected();
      // this.updateNull();
    }
    this.backend.downloadImage(this.member.id).then(path => {
      this.storage.removeDownloadPlan();
      console.log('Downloaded Image path');
      console.log(path);
      // this.. = false;
      this.user.storeAvatarPath(path).then((observer: Observable<any>) => {
        console.log('OK SUBSCRBIBE TO THE OBSERVEr');
        observer.subscribe(() => {
          console.log('Image uploaded');
          this.uploading = false;
          this.localImgPath = this.webview.convertFileSrc(path);
        }, error => {
          console.log(JSON.stringify(error));
          this.onUploadError();
        });
      }, error => {
        console.log(error);
        this.onUploadError();
      });
    }, error => {
      console.log(error);
      this.onUploadError();
    });
    // }, 500);
  }

  retrieveImage() {
    this.uploading = true;
    this.showCamera.emit(true);

    return;
    setTimeout(() => {
      this.imageretriever.retrieveFromPhone().then(path => {
        this.storage.removeDownloadPlan();
        console.log('Image path');
        console.log(path);

        this.user.storeAvatarPath(path).then((observer: Observable<any>) => {
          console.log('OK SUBSCRBIBE TO THE OBSERVEr');
          observer.subscribe(() => {
            console.log('Image uploaded');
            this.uploading = false;
            this.localImgPath = this.webview.convertFileSrc(path);
          }, error => {
            console.log(JSON.stringify(error));
            this.onUploadError();
          });
        }, error => {
          console.log(error);
          this.onUploadError();
        });
      }, error => {
        console.log(error);
        this.onUploadError();
      });
    }, 500);
  }

  setPicture(img) {
    console.log('Fake upload image');
    setTimeout(() => {
      this.uploading = false;
    }, 1000);
  }

  onUploadError() {
    setTimeout(() => {
      this.vibraton.vibrate(200);
      this.uploading = false;
      this.uploadError = true;
      setTimeout(() => {
        this.uploadError = false;
      }, 1500);
    }, 100);
  }

  openEditInfosPerso() {
    this.router.navigateByUrl('edit-info-perso');
  }

  openEditCompetency() {
    this.router.navigateByUrl('edit-competency');
  }

  openEditInterests() {
    this.router.navigateByUrl('edit-interests');
  }

  editContacts() {
    this.router.navigateByUrl('edit-contacts');
  }

  editBiography() {
    this.router.navigateByUrl('edit-biography');
  }

  openMail() {
    this.open('mailto:' + this.member.email);
  }

  openPhone() {

    this.callNamber.callNumber('+228' + this.member.phoneNumber, true).then(_ => {
      console.log(_);
    }).catch(_ => {
      this.open('tel://+228' + this.member.phoneNumber);
    });
  }

  openWhatsapp() {
    this.open('https://wa.me/+228' + this.member.phoneNumber);
  }

  openLinkedin() {
    this.open('https://' + this.member.linkedin);
  }

  openFacebook() {
    this.open('https://' + this.member.facebook);
  }

  openTwitter() {
    this.open('https://' + this.member.twitter);
  }

  openWebsite() {
    this.open('https://' + this.member.website);
  }

  openWeb() {
    if (!this.editmode) {
      this.backend.getProfilUrl(this.user.connected.id, this.member.id).subscribe((res: any) => {
        this.open(res.link);
      })
    } else {
      this.backend.getMyProfilUrl(this.user.connected.id).subscribe((res: any) => {
        this.open(res.link);
      })
    }

  }


  private open(url: string) {
    this.inAppBroswer.create(url, '_system', {

    });
  }

  async presentContactActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Contacter ' + this.member.lastName + ' sur ',
      // mode: 'ios',
      buttons: [{
        text: 'Téléphone',
        role: 'phone',
        icon: 'call',
        handler: () => {
          this.openPhone();
        }
      }, {
        text: 'Whatsapp',
        icon: 'logo-whatsapp',
        handler: () => {
          this.openWhatsapp();
        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }

  capitalize(value: string) {
    if (!value) {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.substring(1);;
  }
}
