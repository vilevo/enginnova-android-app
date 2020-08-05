import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, IonInput } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { CallBackendService } from 'src/app/services/api/call-backend.service';
import { UserService } from 'src/app/services/user.service';
import { MemberModel } from 'src/app/models/member-model';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { StorageService } from 'src/app/services/storage.service';
import { APIRouteService } from 'src/app/services/apiroute.service';
import { MatInput } from '@angular/material';
import { SearchAutocompleteComponent } from 'src/app/components/search-autocomplete/search-autocomplete.component';
import { SearchAutocompleteService } from 'src/app/services/ui/search-autocomplete.service';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ConnectionErrorPaneComponent } from 'src/app/components/connection-error-pane/connection-error-pane.component';
import { InternetService } from 'src/app/services/internet.service';
import { UtilitiesService } from 'src/app/services/utilities.service';


export interface Competency {
  value: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  animations: [
    trigger('helper', [
      state('show', style({
        padding: '11px',
        height: '55px',
      })),
      state('hide', style({
        padding: '0',
        height: '0px'
      })),
      transition('show => hide', [
        animate('0.5s'),
      ]),
      transition('hide => show', [
        animate('1s')
      ]),
      transition('* => show', [
        animate('1s')
      ]),
      transition('hide => *', [
        animate('1s')
      ])
    ])
  ]
})
export class SearchPage implements OnInit, OnDestroy {

  showAdvanced = false;

  removable = true;

  searchModel = '';

  wait_answer = false;

  showAnswer = false;

  test_results = 0;

  showHelper = true;

  alertAlready = false;

  showErrorPane = false;

  fake;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  slidesOptions = {
    slidesPerView: 2.2,
    initialSlide: 1,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 0,
    freeMode: true,
    loop: false,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  recentsSlidesOptions = {
    slidesPerView: 6.5,
    initialSlide: 1,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 0,
    freeMode: true,
    loop: false,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
  competencies: Array<string> = [];

  searchResult: Array<MemberModel>;

  lastSearchResult: Array<any>;


  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  private myId = 0;

  private request: Subscription;

  backClicked = false;

  searchForm: FormGroup;

  showAutocomplete = false;

  @ViewChild('searchbar', { static: true }) inputSearch: IonInput;
  @ViewChild('connection-error-pane', { read: ConnectionErrorPaneComponent, static: false }) connectErrPane: ConnectionErrorPaneComponent;

  private connectionStatus: Subscription;

  constructor(
    private router: Router,
    private platfom: Platform,
    private statusbar: StatusBar,
    private ngxSpinner: NgxSpinnerService,
    private location: Location,
    private callBackend: CallBackendService,
    private userService: UserService,
    private storage: StorageService,
    private apiRoutes: APIRouteService,
    private autompleteService: SearchAutocompleteService,
    private formBuilder: FormBuilder,
    private overlay: Overlay,
    private hasInternet: InternetService,
    private utils: UtilitiesService
  ) {
    this.searchResult = [];
    this.lastSearchResult = [];

    this.searchForm = this.formBuilder.group({
      searchInput: ['']
    });

    this.fake = this.utils.fakeMember();

    this.platfom.ready().then(() => {

    });
  }

  async ngOnInit() {
    this.connectionStatus = this.hasInternet.connectionStatus$.subscribe(
      next => {
        if (next.connected) {
          this.showErrorPane = false;
        } else {
          this.showErrorPane = true;
        }
      }
    );
    const member = await this.userService.getConnected();
    // const member = this.utils.fakeMember();
    this.loadRecentResult();
    this.myId = member.id;
    console.log(member);
    console.log(this.competencies);
    for (const c of this.competencies) {
      console.log('A compent : ' + c);
    }

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    setTimeout(() => {
      this.showHelper = false;
    }, 3000);

    console.log(this.searchForm.get('searchInput'));

    this.searchForm.get('searchInput').valueChanges.subscribe((value) => {
      this.searchModel = value.trim();
      this.autoComplete();
    });

    this.autompleteService.end$.subscribe((value) => {
      this.searchModel = value;
      this.searchForm.get('searchInput').setValue('', {
        emitEvent: false
      });
      this.add();
    });

    this.inputSearch.autofocus = true;
  }
  // body = body.participant;

  back() {
    // this.router.navigateByUrl('/home');
    if (this.request) {
      this.request.unsubscribe();
    }
    this.location.back();
  }

  autoComplete() {
    this.showAutocomplete = true;
    if (this.searchModel.length === 0) {
      this.autompleteService.closeOverlay();
      return;
    }

    this.autompleteService.openOverlay();

    this.autompleteService.makeCompetencySearch(this.searchModel);
  }

  private makeSearch() {

    this.showErrorPane = false;
    this.showHelper = false;

    // Stop the last search
    if (this.request) {
      this.request.unsubscribe();
    }
    this.wait_answer = true;

    this.showAnswer = true;

    this.request = this.callBackend.makeSearch(this.myId, this.competencies).subscribe((result) => {
      this.request = null;
      // this.showAnswer = true;

      // this.showResult(r);
      console.log(result);
      this.showResult(result);
      this.setLastResult(this.lastSearchResult);

    }, (error) => {
      this.onError();
    });



    // // Make the request
    // setTimeout(() => {


    //   this.showAnswer = true;

    //   const r = [2, 3, 1, 4, 6, 7];
    //   this.showResult(r);
    //   console.log('Save the last result response');
    //   this.setLastResult(this.lastSearchResult);
    // }, 1000);
  }

  addCompe() {
    this.autompleteService.closeOverlay();
    this.add();
  }

  async add() {
    let value = this.searchModel.trim();

    // Reset the input value
    this.searchModel = '';

    // this.ngxSpinner.show();
    this.test_results = 0;

    value = value.trim();
    if ((value || '').trim()) {


      if (this.competencies.indexOf(value) !== -1) {
        // An alert and exit
        console.log('An alert and exit');
        this.alertAlready = true;
        setTimeout(() => {
          this.alertAlready = false;
        }, 500);
        return;
      }

      this.userService.addIntrestedCompetency(value);
      this.competencies.push(value);
      this.competencies = this.competencies.reverse();

      this.makeSearch();
    }

  }

  async remove(competency) {
    const index = this.competencies.indexOf(competency);

    if (index >= 0) {
      this.competencies.splice(index, 1);

      if (this.competencies.length === 0) {
        if (this.request) {
          this.request.unsubscribe();
        }
        this.wait_answer = false;
        return;
      }

      console.log('Removed competemcy : ' + competency);
      console.log(this.competencies);


      this.makeSearch();

    }

  }

  onError() {
    console.log('Error while making search request');
    setTimeout(() => {
      console.log('Show the  pane');
      this.showErrorPane = true;
    }, 500);
  }

  showResult(results: Array<any>) {
    if (results && results.length > 0) {
      this.searchResult = [];
      this.lastSearchResult = [];
      this.showNextResult(0, results);
      this.setLastResult(this.lastSearchResult);
    } else {
      console.log('NO result to show');
      this.onError();
    }

  }

  showNextResult(current, results) {
    const id = results[current].id;
    console.log('Show next   ' + results[current]);
    if (id && !this.backClicked) {
      this.request = this.callBackend.getParticipant(results[current].id).subscribe((member) => {
        this.request = null;

        this.searchResult.push(member);
        console.log(member);
        this.lastSearchResult.push(member);

        if (current < results.length - 1) {
          console.log('call next answer');
          this.showNextResult(current + 1, results);
        } else {
          this.wait_answer = false;
          this.setLastResult(this.lastSearchResult);
        }
      }, error => {
        this.onError();
      });
    }
  }

  openLoadingSpinner(): void {
    // const dialogRef = this.dialog.open(ProgressSpinnerDialogComponentComponent, {
    //   width: '250px',
    //   data: null
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private loadRecentResult() {
    // In form of ID, nom
    this.storage.loadRecentSearchResult().then((result) => {
      this.lastSearchResult = result;
    });
  }

  private setLastResult(result: Array<number>) {
    this.storage.persistResult(result);
  }

  onRetry() {
    this.showErrorPane = false;
    this.wait_answer = false;
    setTimeout(() => {
      if (this.competencies.length) {
        this.showAnswer = false;
        this.makeSearch();
      }
    }, 500);
  }

  ngOnDestroy(): void {
    this.connectionStatus.unsubscribe();
  }

  getImage(member) {
    return (member.image) ? this.apiRoutes.imgRouteBase + member.image : '/assets/user_1.png';
  }
}
