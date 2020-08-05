import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LikedMemberPage } from './liked-member.page';
import { ListMenuModule } from 'src/app/modules/list-menu/list-menu.module';
import { MaterialModule } from 'src/app/modules/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: LikedMemberPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ListMenuModule,
    MaterialModule
  ],
  declarations: [LikedMemberPage],
  providers: [
    Location
  ]
})
export class LikedMemberPageModule { }
