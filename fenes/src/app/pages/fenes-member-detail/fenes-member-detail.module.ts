import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, ToastController } from '@ionic/angular';

import { FenesMemberDetailPage } from './fenes-member-detail.page';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { AppRootModule } from 'src/app/modules/app-root/app-root.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ConnectionErrorPaneModule } from 'src/app/modules/connection-error-pane/connection-error-pane.module';
import { PipesModule } from 'src/app/modules/pipes/pipes.module';


const routes: Routes = [
  {
    path: '',
    component: FenesMemberDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    AppRootModule,
    NgxSpinnerModule,
    AngularFontAwesomeModule,
    ConnectionErrorPaneModule,
  ],
  declarations: [
    FenesMemberDetailPage,
  ],
  providers: [
    ToastController,
    InAppBrowser
  ]
})
export class FenesMemberDetailPageModule { }
