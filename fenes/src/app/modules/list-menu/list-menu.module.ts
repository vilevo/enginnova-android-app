import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMenuComponent } from 'src/app/components/list-menu/list-menu.component';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ListMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule
  ],
  exports: [

    ListMenuComponent

  ]
})
export class ListMenuModule { }
