import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-work-chooser',
  templateUrl: './work-chooser.page.html',
  styleUrls: ['./work-chooser.page.scss'],
})
export class WorkChooserPage implements OnInit {


  searchForm: FormGroup;

  constructor(
    fb: FormBuilder
  ) {
    this.searchForm = fb.group({
      searchInput: ['']
    });
  }

  ngOnInit() {
  }

}
