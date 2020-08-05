import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IntroSlidesPage } from './intro-slides.page';

const routes: Routes = [
  {
    path: '',
    component: IntroSlidesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [IntroSlidesPage]
})
export class IntroSlidesPageModule {}
