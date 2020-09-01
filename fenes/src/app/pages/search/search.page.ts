import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, IonSearchbar } from '@ionic/angular';
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
import { SearchAutocompleteService } from 'src/app/services/ui/search-autocomplete.service';
import { Overlay } from '@angular/cdk/overlay';
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

  toSearch: 'participants' | 'posts' | 'annonces' = 'participants';

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

  searchState: null | 'searching' | 'result' = null;

  emptyResult: 'not yet' | 'true' | 'false' = 'not yet';

  selectedTab = 0;

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

  searchResult: Array<MemberModel | any>;

  // lastSearchResult: Array<any>;


  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  private myId = 0;

  private request: Subscription;

  backClicked = false;

  searchForm: FormGroup;

  showAutocomplete = false;


  @ViewChild('searchBar', { static: true, read: IonSearchbar }) inputSearch: IonSearchbar;
  @ViewChild('connection-error-pane', { read: ConnectionErrorPaneComponent, static: false }) connectErrPane: ConnectionErrorPaneComponent;

  private connectionStatus: Subscription;

  constructor(
    private platfom: Platform,
    private location: Location,
    private callBackend: CallBackendService,
    private userService: UserService,
    private apiRoutes: APIRouteService,
    private autompleteService: SearchAutocompleteService,
    private formBuilder: FormBuilder,
    private hasInternet: InternetService,
    private utils: UtilitiesService,
    private inAppBrowser: InAppBrowser,

    private server: APIRouteService,

    private uxInfo: UXInfosService,
  ) {
    this.searchResult = [];

    this.searchForm = this.formBuilder.group({
      searchInput: ['']
    });

    this.fake = this.utils.fakeMember();

    this.platfom.ready().then(() => {

    });
  }

  async ngOnInit() {
    this.uxInfo.appBottom.emit('hide');
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
    this.myId = member.id;
    console.log(member);

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    setTimeout(() => {
      this.showHelper = false;
    }, 3000);

    console.log(this.searchForm.get('searchInput'));

    this.autompleteService.end$.subscribe((value) => {
      this.searchModel = value;
      this.searchForm.get('searchInput').setValue('', {
        emitEvent: false
      });
    });

    this.inputSearch.getInputElement().then((e) => {
      e.autofocus = true;
    });
    this.inputSearch.ionChange.subscribe((event) => {
      this.searchModel = event.detail.value.trim();
      console.log("New search model: " + this.searchModel);
      if (this.searchModel.length != 0) {
        this.makeSearch(this.searchModel);
      }
    })
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

  private stopPendingRequest() {
    if (this.request) {
      this.request.unsubscribe();
      this.request = null;
    }
  }


  private parseToSearch(toSearchIndex) {
    if (toSearchIndex == 0) {
      this.toSearch = 'participants';
    } else if (toSearchIndex == 1) {
      this.toSearch = 'posts';
    } else if (toSearchIndex == 2) {
      this.toSearch = 'annonces';
    }
  }

  parseToSearchAndUpdate(i) {
    this.selectedTab = i;
    console.log("SEARCH THIS: " + this.searchModel);
    this.parseToSearch(i);
    this.makeSearch(this.searchModel);
  }

  private makeSearch(str) {
    this.searchState = 'searching';
    this.emptyResult = 'not yet';

    this.showErrorPane = false;
    this.showHelper = false;

    this.stopPendingRequest()
    this.wait_answer = true;

    this.showAnswer = true;

    this.request = this.callBackend.makeSearch2(this.myId, str, this.toSearch).subscribe((result: any) => {
      this.searchState = 'result';
      this.request = null;

      this.showResult(result);
      // this.setLastResult(this.lastSearchResult);

    }, (error) => {
      this.searchState = 'result';
      console.log(error);
      this.onError();
    });

  }

  addCompe() {
    this.autompleteService.closeOverlay();
  }

  onError() {
    this.wait_answer = false;
    console.log('Error while making search request');
    setTimeout(() => {
      console.log('Show the  pane');
      this.showErrorPane = true;
    }, 500);
  }

  showResult(results: Array<any>) {
    console.log(results);
    this.searchResult = results
    if (results.length != 0) {
      this.emptyResult = 'true';
    } else {
      this.emptyResult = 'false';
    }
    this.wait_answer = false;
    // this.searchResult.push(this.)
  }


  updateSearch(index) {
    this.parseToSearch(index);
    this.searchResult = [];
    this.makeSearch(this.searchModel);
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


  onRetry() {
    this.showErrorPane = false;
    this.wait_answer = false;
    setTimeout(() => {
      if (this.competencies.length) {
        this.showAnswer = false;
        this.makeSearch(this.searchModel);
      }
    }, 500);
  }

  ngOnDestroy(): void {
    this.connectionStatus.unsubscribe();
  }

  getImage(member) {
    return (member.image) ? this.apiRoutes.imgRouteBase + member.image : '/assets/user_1.png';
  }


  onSearchSubmit(event: CustomEvent, searchBar: IonSearchbar) {
    console.log("Make search");
    console.log(searchBar.value);
    this.searchModel = searchBar.value;
    event.stopPropagation()
    this.makeSearch(this.searchModel);

  }

  open(type: "p" | "a") {
    console.log('Ouvrir ce post dans le navigateur');
    if (type == 'p') {
      // this.router.navigateByUrl('http://localhost:8000/redirect/post/{id}');
      this.inAppBrowser.create(this.server.mainBase + '/redirect/posts/20000');
    } else {
      this.inAppBrowser.create(this.server.mainBase + '/redirect/annonces/2000');
    }
  }

  openPost() {
    this.open('p')
  }

  openAnnonce() {
    this.open('a')
  }
}
