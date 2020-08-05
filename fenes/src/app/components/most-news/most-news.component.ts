import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'most-news',
  templateUrl: './most-news.component.html',
  styleUrls: ['./most-news.component.scss'],
})
export class MostNewsComponent implements OnInit {

  @Output() interested = new EventEmitter<boolean>()

  emitted = false;

  news = [{}, {}, {}, {}, {}];

  constructor() { }

  ngOnInit() { }


  fireInterest() {

    // if (!this.emitted) {
    this.interested.emit(true);
    this.emitted = true;
    // }
  }

}
