import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemChooserService {

  work$ = new EventEmitter<string>(false);
  enterprise$ = new EventEmitter<string>(false);
  quarter$ = new EventEmitter<string>(false);
  competency$ = new EventEmitter<string>(false);
  interests$ = new EventEmitter<string>(false);

  constructor() {

  }

  emitWork(value) {
    this.work$.emit(value);
  }

  emitEnterprise(value) {
    this.enterprise$.emit(value);
  }

  emitQuarter(value) {
    this.quarter$.emit(value);
  }

  emitCompetency(value) {
    this.competency$.emit(value);
  }

  emitInterest(value) {
    this.interests$.emit(value);
  }
}
