import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditCompetencyPage } from './edit-competency.page';
import { MaterialModule } from '../../modules/material/material.module';
import { FenesUxInfosModule } from 'src/app/modules/fenes-ux-infos/fenes-ux-infos.module';
import { Vibration } from '@ionic-native/vibration';

const routes: Routes = [
  {
    path: '',
    component: EditCompetencyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    // ReactiveFormsModule,
    MaterialModule,
    FenesUxInfosModule
  ],
  declarations: [EditCompetencyPage],
})
export class EditCompetencyPageModule { }
