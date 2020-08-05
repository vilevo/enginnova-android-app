import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MediaMatcher } from '@angular/cdk/layout';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { SearchModule } from 'src/app/modules/search/search.module';
import { AppRootModule } from 'src/app/modules/app-root/app-root.module';
import { FenesMemberComponent } from 'src/app/components/fenes-member/fenes-member.component';
import { CallBackendService } from 'src/app/services/api/call-backend.service';
import { APIRouteService } from 'src/app/services/apiroute.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ConnectionErrorPaneModule } from 'src/app/modules/connection-error-pane/connection-error-pane.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    MaterialModule,
    SearchModule,
    AppRootModule,
    ConnectionErrorPaneModule,
    ScrollingModule,
    LazyLoadImageModule
  ],
  declarations: [
    HomePage,
    FenesMemberComponent,
  ],
  providers: [
    MediaMatcher,
    CallBackendService,
    APIRouteService,
    Vibration,
    APIRouteService
  ]
})
export class HomePageModule { }
