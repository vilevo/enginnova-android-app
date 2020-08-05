import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, Platform } from '@ionic/angular';

import { SignUpPage } from './sign-up.page';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { MatNativeDateModule, MatDialog } from '@angular/material';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


const routes: Routes = [
  {
    path: '',
    component: SignUpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MatNativeDateModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  declarations: [
    SignUpPage,
  ],
  providers: [
    LiveAnnouncer,
    FormBuilder,
    MatDialog,
    StatusBar,
    Platform,
    NgxSpinnerService
  ],
  entryComponents: [

  ]
})
export class SignUpPageModule { }
