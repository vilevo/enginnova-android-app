import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { UXInfosService, InfoEvent } from 'src/app/services/ui/uxinfos.service';

@Component({
  selector: 'app-uxinfos',
  templateUrl: './uxinfos.component.html',
  styleUrls: ['./uxinfos.component.scss'],
  animations: [
    trigger('message', [
      state('show', style({
        padding: '11px',
        height: '55px',
      })),
      state('hide', style({
        padding: '0',
        height: '0px',
      })),
      transition('show => hide', [
        animate('1.5s'),
      ]),
      transition('hide => show', [
        animate('0.5s')
      ]),
      transition('* => hide', [
        animate('1s')
      ]),
      transition('* => show', [
        animate('1s')
      ]),
      transition('hide => *', [
        animate('0.5s')
      ])
    ]),
  ]
})
export class UXInfosComponent implements OnInit, OnDestroy {

  show = false;
  showLoading = false;
  showError = false;
  showOkay = false;


  message = '';

  constructor(
    private uxInfosService: UXInfosService
  ) {

  }

  ngOnInit() {
    this.subscribeLoading();
    this.subscribeError();
    this.subscribeOkay();
    this.subscribeHideAll();
  }

  ngOnDestroy(): void {
    // this.uxInfosService.loading.unsubscribe();
    // this.uxInfosService.error.unsubscribe();
    // this.uxInfosService.okay.unsubscribe();
  }

  subscribeLoading() {
    this.uxInfosService.loading.subscribe(
      (value: InfoEvent) => {
        if (value.type === 'loading') {
          console.log('Got show loading event');
          this.startLoading();
        } else if (value.type === 'stop') {
          this.hide();
        }
      }, (error) => {
        //
      }, (complete) => {
        // this.hide();
      }
    );
  }


  subscribeError() {
    this.uxInfosService.error.subscribe(
      (value: InfoEvent) => {
        if (value.type === 'error') {
          console.log('Got show error event');
          this.message = value.message;
          this.notifyError();
        } else if (value.type === 'hide') {
          this.hide();
        }
      }, error => {
        //
      }, complete => {
        // this.hide();
      }
    );
  }

  subscribeOkay() {
    this.uxInfosService.okay.subscribe(
      (value: InfoEvent) => {
        if (value.type === 'okay') {
          this.notifyOkay();
        } else if (value.type === 'hide') {
          this.hide();
        }
      }, error => {
        //
      }, complete => {
        // this.hide();
      }
    );
  }

  subscribeHideAll() {
    this.uxInfosService.hideAll.subscribe(
      next => {
        this.hide();
      }, error => {
        //
      }, complete => {
        // this.hide();
      }
    );
  }


  startLoading(message?: string) {
    this.showLoading = true;
    this.showError = false;
    this.showOkay = false;
    this.show = true;
  }

  notifyError(message?: string) {
    this.showLoading = false;
    this.showError = true;
    this.showOkay = false;
    this.show = true;
  }


  notifyOkay() {
    this.showLoading = false;
    this.showError = false;
    this.showOkay = true;
    this.show = true;
  }

  hide() {
    this.show = false;
    // this.showLoading = false;
    // this.showError = false;
    // this.showOkay = false;
  }


}
