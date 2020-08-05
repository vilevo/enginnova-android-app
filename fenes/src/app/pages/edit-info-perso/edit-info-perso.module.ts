import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditInfoPersoPage } from './edit-info-perso.page';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { FenesUxInfosModule } from 'src/app/modules/fenes-ux-infos/fenes-ux-infos.module';
import { PipesModule } from 'src/app/modules/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: EditInfoPersoPage
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
    FenesUxInfosModule,
  ],
  declarations: [EditInfoPersoPage],
})
export class EditInfoPersoPageModule {}
