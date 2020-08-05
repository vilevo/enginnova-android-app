import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, Platform } from '@ionic/angular';

import { ItemChooserPage } from './item-chooser.page';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FenesUxInfosModule } from 'src/app/modules/fenes-ux-infos/fenes-ux-infos.module';
import { MatProgressSpinnerModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: ItemChooserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MatProgressSpinnerModule,
    FenesUxInfosModule
  ],
  declarations: [ItemChooserPage],
  providers: [
    FormBuilder,
    StatusBar,
    Platform,
    Location,
  ]
})
export class ItemChooserPageModule { }
