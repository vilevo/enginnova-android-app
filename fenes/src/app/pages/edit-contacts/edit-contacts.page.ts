import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { MemberModel } from 'src/app/models/member-model';
import { ToastServiceService } from 'src/app/services/ui/toast-service.service';
import { AlertController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';

@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.page.html',
  styleUrls: ['./edit-contacts.page.scss'],
})
export class EditContactsPage implements OnInit, OnDestroy {

  memberModel: MemberModel;
  contactForm: FormGroup;
  showValidateBtn = true;
  request: Subscription;

  constructor(
    private location: Location,
    private user: UserService,
    private toast: ToastServiceService,
    public alertController: AlertController,
    private fb: FormBuilder,
    private infoService: UXInfosService,
    private platform: Platform
  ) {

  }

  async ngOnInit() {
    this.memberModel = await this.user.getConnected();
    this.buildForm();
  }

  ngOnDestroy(): void {
    console.log('Unregister back button');
    this.platform.backButton.unsubscribe();
  }

  submit() {
    if (this.contactForm.valid) {
      console.log('All data is correct. Submit');
      console.log(this.contactForm.value);

      this.memberModel.phoneNumber = this.contactForm.value.phoneNumber;
      this.memberModel.email = this.contactForm.value.email;
      this.memberModel.facebook = this.contactForm.value.facebook;
      this.memberModel.twitter = this.contactForm.value.twitter;
      this.memberModel.linkedin = this.contactForm.value.linkedin;
      this.memberModel.website = this.contactForm.value.website;

      this.infoService.startLoading();
      this.showValidateBtn = false;
      this.request = this.user.updateConnected(this.memberModel).subscribe(
        next => {
          console.log(next);
          this.contactForm.markAsUntouched();
          this.request = null;
          this.infoService.showOkay();
          this.showValidateBtn = true;

        },
        error => {
          // console.log(error);
          this.request = null;
          this.infoService.showError();
          this.showValidateBtn = true;

        },
        () => {
          console.log('Complete');

        }
      );
      return true;
    }
    this.onInvalid();
    return false;
  }

  onInvalid() {
    console.log('Invalid data set');
    // this.toast.presentDefault();
  }

  buildForm() {
    this.contactForm = this.fb.group({
      phoneNumber: [this.memberModel.phoneNumber, [
        Validators.minLength(8)
      ]],
      email: [this.memberModel.email, [
        Validators.email,
      ]],
      facebook: [this.memberModel.facebook, [
        // Validators.
      ]],
      twitter: [this.memberModel.twitter, [

      ]],
      linkedin: [this.memberModel.linkedin, [

      ]],
      website: [this.memberModel.website, [

      ]],
    });

    // this.contactForm.valueChanges.subscribe(next => {
    //   this.showValidateBtn = true;
    // });
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
    if (this.contactForm.touched) {
      await alert.present();
    } else {
      this.back();
    }
  }
}
