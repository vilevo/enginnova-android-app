import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'populars',
  templateUrl: './populars.component.html',
  styleUrls: ['./populars.component.scss'],
})
export class PopularsComponent implements OnInit {

  slidesOptions  = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    effect: 'fade',
    spaceBetween: 0,
    slidesPerView: 3.1,
    freeMode: false,
    loop: false,

  };

  populars = [
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
  ]

  @ViewChild('slides', { read: IonSlides, static: true }) slides: IonSlides

  constructor() { }

  ngOnInit() {
    // this.slides.startAutoplay();
  }

}
