import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UXInfosComponent } from 'src/app/components/uxinfos/uxinfos.component';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material/material.module';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [
    UXInfosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule
  ],
  exports: [
    UXInfosComponent
  ],
  providers: [
    UXInfosService,
    Vibration
  ]
})
export class FenesUxInfosModule { }
