import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashService {

  private splashEventSource = new Subject<boolean>();
  splash$ = this.splashEventSource.asObservable();

  constructor() {
    this.showSplash();
    // Hide the splash after 5000ms
    setTimeout(() => {
      this.hideSplash();
    }, 5000);
  }

  showSplash() {
    this.splashEventSource.next(true);
  }

  hideSplash() {
    this.splashEventSource.next(false);
  }

}
