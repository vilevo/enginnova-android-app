import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UniqueIdService {

  // lazy one

  constructor() { }

  get() {
    return Date.now();
  }
}
