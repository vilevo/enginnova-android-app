import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionErrorPaneComponent } from 'src/app/components/connection-error-pane/connection-error-pane.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ConnectionErrorPaneComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ConnectionErrorPaneComponent
  ]
})
export class ConnectionErrorPaneModule { }
