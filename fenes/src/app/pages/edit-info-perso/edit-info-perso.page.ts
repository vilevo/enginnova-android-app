import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { MemberModel } from 'src/app/models/member-model';
import { AlertController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';
import { Router } from '@angular/router';
import { ItemChooserService } from 'src/app/services/ui/item-chooser.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'D-MM-YYYY',
  },
  display: {
    dateInput: 'D-MM-YYYY',
    monthYearLabel: 'D-MM-YYYY',
    dateA11yLabel: 'D-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-info-perso',
  templateUrl: './edit-info-perso.page.html',
  styleUrls: ['./edit-info-perso.page.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class EditInfoPersoPage implements OnInit, OnDestroy {

  infoPersoForm: FormGroup;

  public memberModel: MemberModel;

  public showCloseBtn = true;

  private request: Subscription;
  private d;


  constructor(
    private location: Location,
    private user: UserService,
    public alertController: AlertController,
    private fb: FormBuilder,
    private infoService: UXInfosService,
    private platform: Platform,
    private router: Router,
    private itemModified: ItemChooserService,
    // private utils: UtilitiesService
  ) {

  }

  async ngOnInit() {
    this.memberModel = await this.user.getConnected();
    if (this.memberModel.birthDate) {
      this.d = (moment(this.memberModel.birthDate));
    } else {
      this.d = '';
    }
    this.buildForm();
    this.subscribeToEvents();
  }

  ngOnDestroy(): void {
    console.log('Unregister back button');
    this.platform.backButton.unsubscribe();
  }

  buildForm() {
    this.infoPersoForm = this.fb.group({
      firstName: [this.memberModel.firstName, [
        Validators.required
      ]],
      lastName: [this.memberModel.lastName, [
        Validators.required
      ]],
      job: [this.memberModel.job, [
        Validators.required
      ]],
      enterprise: [this.memberModel.enterprise, [
        Validators.required
      ]],
      birthDate: [this.d, [
        Validators.nullValidator
      ]],
      quarter: [this.memberModel.quarter, [
        Validators.nullValidator
      ]]
    });
  }

  submit() {
    console.log('Submit');

    this.infoPersoForm.updateValueAndValidity({
      emitEvent: true,
    })
    if (this.infoPersoForm.valid) {
      console.log('All data is correct. Submit');

      this.memberModel.firstName = this.infoPersoForm.value.firstName;
      this.memberModel.lastName = this.infoPersoForm.value.lastName;
      this.memberModel.job = this.infoPersoForm.value.job;
      this.memberModel.enterprise = this.infoPersoForm.value.enterprise;
      console.log('B DATE: ' + this.infoPersoForm.value.birthDate);
      const m = moment(this.infoPersoForm.value.birthDate);
      const v = m.format('D-MM-YYYY');
      console.log(m.toJSON());
      this.memberModel.birthDate = v;
      this.memberModel.quarter = this.infoPersoForm.value.quarter;

      this.infoService.startLoading();
      this.request = this.user.updateConnected(this.memberModel).subscribe((rep) => {
        console.log(rep);
        this.request = null;
        this.infoService.showOkay();
        this.infoPersoForm.markAsUntouched();
      }, error => {
        console.log(error);
        this.request = null;
        this.infoService.showError('Error message');
      });
    } else {
      this.infoService.showError('Some value are incorrect');
      console.log(this.infoPersoForm);
    }


    return true;
  }

  onInvalid() {
    console.log('Invalid data set');
    // this.toast.presentDefault();
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
    if (this.infoPersoForm.touched) {
      await alert.present();
    } else {
      this.back();
    }
  }

  openWorkChooser() {
    this.router.navigateByUrl('/item-chooser/1');
  }

  openEnterpriseChooser() {
    this.router.navigateByUrl('/item-chooser/2');
  }

  openQuarterChooser() {
    this.router.navigateByUrl('/item-chooser/3');
  }

  subscribeToEvents() {
    this.itemModified.work$.subscribe(
      value => {
        this.infoPersoForm.get('job').setValue(value);
      }
    );
    this.itemModified.enterprise$.subscribe(
      value => {
        this.infoPersoForm.get('enterprise').setValue(value);
      }
    );
    this.itemModified.quarter$.subscribe(
      value => {
        this.infoPersoForm.get('quarter').setValue(value);
      }
    );
  }
}
