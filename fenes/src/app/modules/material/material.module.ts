import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatRadioModule,
  MatOptionModule,
  MatAutocompleteModule,
  MatInputModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatTabsModule,
  MatStepperModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatChipsModule,
  MatNativeDateModule,
  MatProgressBarModule,
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatRadioModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatTabsModule,
    MatStepperModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    OverlayModule,
    MatChipsModule,
    MatNativeDateModule,
    DragDropModule,
    MatProgressBarModule
  ]
})
export class MaterialModule { }
