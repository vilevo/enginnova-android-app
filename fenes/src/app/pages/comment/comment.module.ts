import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommentPage } from './comment.page';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { Platform } from '@angular/cdk/platform';

const routes: Routes = [
  {
    path: '',
    component: CommentPage
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
  declarations: [CommentPage],
  providers: [
    Location,
    Platform
  ]
})
export class CommentPageModule {}
