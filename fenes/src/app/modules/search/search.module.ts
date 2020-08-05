import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FenesAdvancedSearchComponent } from 'src/app/components/advanced-search/advanced-search.component';
import { FenesAdvancedSearchItemComponent } from 'src/app/components/advanced-search-item/advanced-search-item.component';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FenesToolbarComponent } from 'src/app/components/fenes-toolbar/fenes-toolbar.component';
import { Overlay } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    FenesAdvancedSearchComponent,
    FenesAdvancedSearchItemComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    IonicModule,
    FenesAdvancedSearchComponent,
    FenesAdvancedSearchItemComponent,
    MaterialModule,
  ],
  providers: [],
  entryComponents: [
    FenesAdvancedSearchComponent
  ]
})
export class SearchModule { }
