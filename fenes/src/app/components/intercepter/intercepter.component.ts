import { Component, OnInit, EventEmitter, Output, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'intercepter',
  templateUrl: './intercepter.component.html',
  styleUrls: ['./intercepter.component.scss'],
})
export class IntercepterComponent implements OnInit {

  // Intersection observer
  el;
  window;
  inViewport;
  observer;
  event = new EventEmitter<boolean>(true);
  @Output() intercept = new EventEmitter<boolean>(true);
  constructor(
    private r: ElementRef,
    // private render: Renderer2
  ) {
    this.window = window;
  }

  ngOnInit() {
    // console.log(this.render);
    this.event.subscribe((value) => {
      this.intercept.emit(value);
    });
    const IntersectionObserver = this.window['IntersectionObserver'];
    this.observer = new IntersectionObserver(this.intersectionObserverCallback.bind(this));
    this.observer.POLL_INTERVAL = 100;
    this.observer.USE_MUTATION_OBSERVER = false;
    this.observer.observe(this.r.nativeElement.firstElementChild);

  }


  intersectionObserverCallback(entries) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        console.log('intercepttttttt');
        this.event.emit(true);
        return;
      }
    });
  }



  intersectionObserverFeatureDetection() {
    // Exits early if all IntersectionObserver and IntersectionObserverEntry
    // features are natively supported.
    if ('IntersectionObserver' in this.window &&
      'IntersectionObserverEntry' in this.window) {
      // Minimal polyfill for Edge 15's lack of `isIntersecting`
      // See: https://github.com/w3c/IntersectionObserver/issues/211
      if (!('isIntersecting' in
        this.window['IntersectionObserverEntry']['prototype'])) {
        Object.defineProperty(this.window['IntersectionObserverEntry']['prototype'], 'isIntersecting', {
          get: function () {
            return this.intersectionRatio > 0;
          }
        });
      }
      return true;
    }
    return false;
  }

}
