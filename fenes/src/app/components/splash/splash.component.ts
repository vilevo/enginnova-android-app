import { Component, OnInit, OnDestroy } from '@angular/core';
import { SplashService } from 'src/app/services/splash.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  animations: [
    trigger('helper', [
      state('show', style({
        opacity: 1,
        // transform: 'translateX(0vh)'  vertical-align: 10fr;
      })),
      state('hide', style({
        opacity: 0,
        // transform: 'translateX(-100vh)'
      })),
      transition('show => hide', [
        animate('2.5s'),
      ]),
      transition('hide => show', [
        animate('1s')
      ]),
      transition('* => show', [
        animate('1s')
      ])
    ])
  ]
})
export class SplashComponent implements OnInit, OnDestroy {

  showSplash = true;
  display = true;
  splashRef: Subscription;

  constructor(
    private ss: SplashService
  ) { }

  ngOnInit() {
    this.splashRef = this.ss.splash$.subscribe((show => {

      if (!show) {
        setTimeout(() => {
          this.showSplash = show;
          setTimeout(() => {
            this.display = false;
          }, 500);
        }, 500);
      } else {
        this.showSplash = show;
      }
    }));
  }

  ngOnDestroy(): void {
    this.splashRef.unsubscribe();
  }

}
