import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'most-posts',
  templateUrl: './most-posts.component.html',
  styleUrls: ['./most-posts.component.scss'],
})
export class MostPostsComponent implements OnInit {

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
