import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean
}

@Injectable({
  providedIn: 'root'
})
export class RequestLoaderService {

  private loaderSubject = new Subject<LoaderState>()
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next(<LoaderState>{
      show: true
    })
    this.showLoader()
  }

  hide() {
    this.loaderSubject.next(<LoaderState>{
      show: false
    })
    this.hideLoader()

  }


  private showLoader() {
    console.log("Show request loader")
  }

  private hideLoader() {
    console.log("Hide request Loader")
  }
}
