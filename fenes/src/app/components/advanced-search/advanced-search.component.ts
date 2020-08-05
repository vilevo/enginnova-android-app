import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'fenes-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
})

export class FenesAdvancedSearchComponent implements OnInit {

  dataTypes = [ ];

  constructor(

  ) {

   }

  ngOnInit() {}

  onNoClick(): void {

  }
}
