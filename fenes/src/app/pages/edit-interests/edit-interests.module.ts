import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditInterestsPage } from './edit-interests.page';
import { MaterialModule } from '../../modules/material/material.module';
import { FenesUxInfosModule } from 'src/app/modules/fenes-ux-infos/fenes-ux-infos.module';
import { Vibration } from '@ionic-native/vibration';

const routes: Routes = [
  {
    path: '',
    component: EditInterestsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FenesUxInfosModule
  ],
  declarations: [EditInterestsPage],
})
export class EditInterestsPageModule { }
