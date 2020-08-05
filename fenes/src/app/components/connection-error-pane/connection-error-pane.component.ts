import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InternetService } from 'src/app/services/internet.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'connection-error-pane',
  templateUrl: './connection-error-pane.component.html',
  styleUrls: ['./connection-error-pane.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({
        opacity: 1,
        position: 'unset',
      })),
      state('hide', style({
        opacity: 0,
        position: 'absolute',
      })),
      transition('show => hide', [
        animate('0.5s'),
      ]),
      transition('hide => show', [
        animate('1.5s')
      ]),
      transition('* => show', [
        animate('1.5s')
      ]),
      transition('hide => *', [
        animate('1.5s')
      ])
    ])
  ]
})
export class ConnectionErrorPaneComponent implements OnInit, OnDestroy {

  @Input('show') show = false;
  @Input() noRetry = false;
  @Output('onRetry') onRetry = new EventEmitter();


  private connectionMonitor: Subscription;

  constructor(
    private hasInternet: InternetService
  ) { }

  ngOnInit() {
    this.reactOnConnectionChange();
  }

  ngOnDestroy(): void {
    this.stopReactOnConnectionChange();
  }

  onClick() {
    this.onRetry.emit();
  }

  reactOnConnectionChange() {
    this.connectionMonitor = this.hasInternet.connectionStatus$.subscribe(
      next => {
        if (next.connected) {
          this.onRetry.emit();
        }
      }
    );
  }

  stopReactOnConnectionChange() {
    this.connectionMonitor.unsubscribe();
    this.connectionMonitor = null;
  }
}
