import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MemberModel } from 'src/app/models/member-model';
import { UserService } from 'src/app/services/user.service';
import { AlertController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavigateBackService } from 'src/app/services/ui/navigate-back.service';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';

@Component({
  selector: 'app-edit-biography',
  templateUrl: './edit-biography.page.html',
  styleUrls: ['./edit-biography.page.scss'],
})
export class EditBiographyPage implements OnInit, OnDestroy {

  member: MemberModel;
  bioForm: FormGroup;
  request: Subscription;
  biography = '';

  constructor(
    private location: Location,
    private user: UserService,
    public alertController: AlertController,
    private fb: FormBuilder,
    private backButton: NavigateBackService,
    private uxInfos: UXInfosService
  ) {

    // backButton.event$.subscribe(() => {
    //   this.goBack();
    // });
    this.buildForm();
  }

  async ngOnInit() {
    this.member = await this.user.getConnected();
    this.biography = this.member.biography;
  }

  ngOnDestroy(): void {
    console.log('Unregister back button');
    // this.platform.backButton.unsubscribe();
  }

  submit() {

    if (!this.bioForm.invalid) {
      console.log('All data is correct. Submit');
      this.uxInfos.startLoading();
      if (this.request) {
        this.request.unsubscribe();
      }
      this.member.biography = this.biography;
      console.log('Data to put on the server');
      console.log(this.biography);
      this.request = this.user.updateConnected(this.member).subscribe((rep) => {
        console.log(rep);
        this.uxInfos.showOkay();
        this.request = null;
        this.bioForm.markAsUntouched();
      }, error => {
        console.log(error);
        this.uxInfos.showError();
        this.request = null;
      });
      return true;
    }
    this.onInvalid();
    return false;

  }

  onInvalid() {
    console.log('Invalid data set');
  }

  back() {
    if (this.request) {
      this.request.unsubscribe();
    }
    this.location.back();
  }

  async goBack() {
    const alert = await this.alertController.create({
      header: 'Pas si vite !',
      message: 'Abandonner les <strong color=\'danger\'>modifications</strong>?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            console.log('Confirm Okay');
            this.back();
          }
        }, {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    if (this.bioForm.touched) {
      await alert.present();
    } else {
      this.back();
    }
  }

  buildForm() {
    this.bioForm = this.fb.group({
      bio: ['', [
        Validators.required,

      ]]
    });
  }

}
