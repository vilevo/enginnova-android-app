import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, Platform } from '@ionic/angular';

import { SearchPage } from './search.page';
import { AppRootModule } from 'src/app/modules/app-root/app-root.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SearchModule } from 'src/app/modules/search/search.module';
import { MatChipsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { APIRouteService } from 'src/app/services/apiroute.service';
import {
  ProgressSpinnerDialogComponentComponent
} from 'src/app/components/progress-spinner-dialog-component/progress-spinner-dialog-component.component';

import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ConnectionErrorPaneModule } from 'src/app/modules/connection-error-pane/connection-error-pane.module';
import { SearchAutocompleteModule } from 'src/app/modules/search-autocomplete/search-autocomplete.module';
import { SearchAutocompleteComponent } from 'src/app/components/search-autocomplete/search-autocomplete.component';
import { ListMenuComponent } from 'src/app/components/list-menu/list-menu.component';
import { ListMenuModule } from 'src/app/modules/list-menu/list-menu.module';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AppRootModule,
    MaterialModule,
    SearchModule,
    MatChipsModule,
    NgxSpinnerModule,
    ConnectionErrorPaneModule,
    SearchAutocompleteModule,
    ListMenuModule
  ],
  declarations: [
    SearchPage,
    ProgressSpinnerDialogComponentComponent,
  ],
  providers: [
    StatusBar,
    Platform,
    HttpClientModule,
    APIRouteService,
    NgxSpinnerService,
    InAppBrowser,
  ],
  entryComponents: [
    ProgressSpinnerDialogComponentComponent,
  ]
})
export class SearchPageModule { }
