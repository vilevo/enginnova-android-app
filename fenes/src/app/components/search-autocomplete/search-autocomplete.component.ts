import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { SearchAutocompleteService } from 'src/app/services/ui/search-autocomplete.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fenes-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({
        opacity: 1,
        // height: '100%'
      })),
      state('out', style({
        opacity: 0,
        // height: 0
      })),
      transition('out => in', [
        animate('0.2s'),
      ]),
      transition('in => out', [
        animate('0.5s')
      ]),
      // transition('in => *', [
      //   animate('0.5s')
      // ])
    ]),
    trigger('stateInfo', [
      state('in', style({
        opacity: 1,
        // transform: 'translateY(15.5vh)'
      })),
      state('out', style({
        opacity: 0,
        // transform: 'translateY(0vh)'
      })),
      transition('out => in', [
        animate('1s'),
      ]),
      transition('in => out', [
        animate('1s')
      ]),
      transition('in => *', [
        animate('1s')
      ]),
      transition('* => in', [
        animate('1s')
      ])
    ]),
    trigger('helper', [
      state('show', style({
        // height: '50vh',
        opacity: 1,
      })),
      state('hide', style({
        // height: '0vh',
        opacity: 0,
      })),
      transition('show => hide', [
        animate('0.5s'),
      ]),
      transition('hide => show', [
        animate('1s')
      ]),
      transition('* => *', [
        animate('1s')
      ]),
    ])
  ]
})
export class SearchAutocompleteComponent implements OnInit, OnDestroy {

  @Input() toAutocomplete: string;
  @Output() selected = new EventEmitter<string>();

  result = [];
  loadingResult = false;
  gotError = false;

  searchStart: Subscription;
  searchResult: Subscription;

  constructor(
    private searchService: SearchAutocompleteService,
  ) {
    console.log('Autocomplete service created');
    this.subscribes();
  }

  ngOnDestroy(): void {
    this.searchStart.unsubscribe();
    this.searchResult.unsubscribe();
    console.log('Autocomplete service destroyed');
  }

  subscribes() {
    console.log('Subscribe 1');
    this.searchStart = this.searchService.start$.subscribe(
      show => {
        console.log('Got an event');

        console.log('Search start ? : ' + show);
        this.loadingResult = true;
        this.gotError = false;

        setTimeout(() => {
          if (!show) {
            this.loadingResult = false;
            // this.result = [];
          }
        }, 500);
      }
    );

    console.log('Subscribe 2');
    this.searchResult = this.searchService.competenciesResult$.subscribe(
      next => {
        console.log('Event received');
        if (next.error) {
          setTimeout(() => {

            this.loadingResult = false;
            this.gotError = true;
          }, 500);
        } else {
          console.log('Got the values');
          console.log(next);
          if (next.length === 0) {
            setTimeout(() => {
              this.searchService.closeOverlay();
            }, 500);
            return;
          }
          this.result = [];
          this.loadingResult = false;

          for (const c of next) {
            this.result.push(c);
          }
        }
      }, () => {
        console.log('Completed');
      }
    );
  }

  ngOnInit() {

  }

  select(item) {
    this.searchService.selected(item);
  }
}
