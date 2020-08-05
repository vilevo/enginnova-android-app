import { Injectable, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavigateBackService {

  event$ = new EventEmitter();

  constructor(
    private location: Location,
    private platform: Platform
  ) {
    this.platform.ready().then(_ => {
      this.location.subscribe(__ => {
        this.event$.emit();
      });
      platform.backButton.subscribe(___ => {
        this.event$.emit();
      });
    });
  }
}
