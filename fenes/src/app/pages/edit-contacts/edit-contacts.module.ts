import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditContactsPage } from './edit-contacts.page';
import { MaterialModule } from '../../modules/material/material.module';
import { FenesUxInfosComponent } from 'src/app/components/fenes-ux-infos/fenes-ux-infos.component';
import { FenesUxInfosModule } from 'src/app/modules/fenes-ux-infos/fenes-ux-infos.module';

const routes: Routes = [
  {
    path: '',
    component: EditContactsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
    FenesUxInfosModule
  ],
  declarations: [
    EditContactsPage,
    // FenesUxInfosComponent
  ],
  exports: [
    // FenesUxInfosComponent
  ]
})
export class EditContactsPageModule { }
