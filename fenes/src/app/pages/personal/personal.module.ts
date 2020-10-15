import { CameraComponent } from './../../components/camera/camera.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, Platform } from '@ionic/angular';

import { PersonalPage } from './personal.page';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRootModule } from 'src/app/modules/app-root/app-root.module';
import { UserService } from 'src/app/services/user.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

const routes: Routes = [
  {
    path: '',
    component: PersonalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    AppRootModule
  ],
  declarations: [
    PersonalPage,
  ],
  providers: [
    StatusBar,
    Platform,
    UserService,
    InAppBrowser,
    CallNumber
  ],
  entryComponents: [
    CameraComponent
  ]
})
export class PersonalPageModule { }
