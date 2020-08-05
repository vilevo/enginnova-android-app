import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SearchAutocompleteComponent } from 'src/app/components/search-autocomplete/search-autocomplete.component';
import { ConnectionErrorPaneModule } from '../connection-error-pane/connection-error-pane.module';

@NgModule({
  declarations: [
    SearchAutocompleteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ConnectionErrorPaneModule
  ],
  exports: [
    SearchAutocompleteComponent
  ]
})
export class SearchAutocompleteModule { }
