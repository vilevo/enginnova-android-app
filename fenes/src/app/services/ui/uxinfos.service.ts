import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Vibration } from '@ionic-native/vibration/ngx';


export interface InfoEvent {
  type: 'loading' | 'stop' | 'error' | 'okay' | 'hide';
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UXInfosService {

  // private eventSource = new Subject<InfoEvent>();
  // loading$ = this.eventSource.asObservable();
  loading = new EventEmitter<InfoEvent>(false);
  error = new EventEmitter<InfoEvent>(false);
  okay = new EventEmitter<InfoEvent>(false);
  hideAll = new EventEmitter<InfoEvent>(false);
  appBottom = new EventEmitter<"show" | "hide">(false);

  constructor(
    private vibration: Vibration
  ) { }

  async startLoading() {
    console.log('Fire Loading info');
    this.loading.emit({
      type: 'loading',
    });
  }

  async stopLoading() {
    this.loading.next({
      type: 'stop'
    });
  }


  async showError(message?: string) {
    console.log('Fire Error info');
    this.error.emit({
      type: 'error',
      message: message ? message : ''
    });
  }

  async hideError() {
    this.error.next({
      type: 'hide'
    });
  }


  async showOkay(message?: string) {
    this.okay.emit({
      type: 'okay',
      message
    });
  }

  async hideOkay() {
    this.okay.next({
      type: 'hide'
    });
  }

  async hide() {
    console.log('Hide all uxinfo');
    this.hideAll.emit();
  }

  async vibrateError() {
    console.log('Vibrate error called');
    this.vibration.vibrate(100);
  }
}
