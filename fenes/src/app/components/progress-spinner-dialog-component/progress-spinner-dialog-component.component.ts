import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fenes-progress-spinner-dialog-component',
  templateUrl: './progress-spinner-dialog-component.component.html',
  styleUrls: ['./progress-spinner-dialog-component.component.scss'],
})

export class ProgressSpinnerDialogComponentComponent {

  constructor(
    public dialogRef: MatDialogRef<ProgressSpinnerDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
