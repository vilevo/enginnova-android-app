import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkChooserPage } from './work-chooser.page';
import { MaterialModule } from 'src/app/modules/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: WorkChooserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [WorkChooserPage]
})
export class WorkChooserPageModule {}
