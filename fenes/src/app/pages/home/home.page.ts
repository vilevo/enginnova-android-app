import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FenesPresentatorsComponent } from 'src/app/components/fenes-presentators/fenes-presentators.component';
import { CallBackendService } from 'src/app/services/api/call-backend.service';
import { ToastController, IonInfiniteScroll, IonVirtualScroll, IonRefresher, IonContent } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { MemberModel } from 'src/app/models/member-model';
import { Router, NavigationStart } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { SplashService } from 'src/app/services/splash.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InternetService } from 'src/app/services/internet.service';
import { Subscription, BehaviorSubject, Observable, Subject } from 'rxjs';
import { ConnectionErrorPaneComponent } from 'src/app/components/connection-error-pane/connection-error-pane.component';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { APIRouteService } from 'src/app/services/apiroute.service';
import { BottomComponent } from 'src/app/components/bottom/bottom.component';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';


// export class MyDataSource extends DataSource<MemberModel | undefined> {
//   private _length = 100000;
//   private _pageSize = 100;
//   private _cachedData = Array.from<MemberModel>({ length: this._length });
//   private _fetchedPages = new Set<number>();
//   private _dataStream = new BehaviorSubject<(MemberModel | undefined)[]>(this._cachedData);
//   private _subscription = new Subscription();

//   constructor(private backend: CallBackendService) {
//     super();
//   }

//   connect(collectionViewer: CollectionViewer): Observable<(MemberModel | undefined)[]> {

//     this._subscription.add(collectionViewer.viewChange.subscribe(range => {
//       const startPage = this._getPageForIndex(range.start);
//       const endPage = this._getPageForIndex(range.end - 1);
//       for (let i = startPage; i <= endPage; i++) { this._fetchPage(i); }
//     }));

//     return this._dataStream;
//   }

//   disconnect(): void {
//     this._subscription.unsubscribe();
//   }

//   private _getPageForIndex(index: number): number {
//     return Math.floor(index / this._pageSize);
//   }

//   private _fetchPage(page: number) {
//     if (this._fetchedPages.has(page)) { return; }
//     this._fetchedPages.add(page);
//     // Use `setTimeout` to simulate fetching data from server. 
//     // setTimeout(() => {
//     //   this._cachedData.splice(page * this._pageSize, this._pageSize, ...Array.from(
//     //     { length: this._pageSize })

//     //     .map((_, i) => new MemberModel())
//     //   );

//     //   this._dataStream.next(this._cachedData);

//     // }, Math.random() * 1000 + 200);


//     this.backend.getParticipants(page).subscribe((members) => {
//       this._cachedData.splice(page * this._pageSize, this._pageSize, ...Array.from(
//         { length: this._pageSize })

//         .map((_, i) => members[i])
//       );

//       this._dataStream.next(this._cachedData);

//     }, (error) => {
//       // this.handleError();
//     });

//   }

//   clear() {
//     this._cachedData = [];
//     this._dataStream.next(this._cachedData);
//   }
// }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('actionsBar', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0vh)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(-10vh)'
      })),
      transition('show => hide', [
        animate('1.5s'),
      ]),
      transition('hide => show', [
        animate('1s')
      ]),
      transition('* => show', [
        animate('1s')
      ]),
      transition('hide => *', [
        animate('1.5s')
      ])
    ])
  ]
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('fenes-presentators', { read: FenesPresentatorsComponent, static: false }) fenesprese: FenesPresentatorsComponent;
  @ViewChild('connection-error-pane', { read: ConnectionErrorPaneComponent, static: false }) connectErrPane: ConnectionErrorPaneComponent;

  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll, { static: false }) virtualScroll: IonVirtualScroll;

  @ViewChild(BottomComponent, { static: false }) appBottom: BottomComponent;

  currentPage = 1;


  public firstLoad = true;
  public showAction = true;
  // public initialMember = [];
  public members = [];
  public showLoader = true;
  public showErrorPane = false;
  connected: MemberModel;
  connectionMonitor: Subscription;
  private request: Subscription;
  private routerEvents: Subscription;
  private dynamicRow = false;

  // private dataSource: MyDataSource;

  private obDatas = new Subject();

  private lastScrollTop = 0;

  constructor(
    private statusbar: StatusBar,
    private backend: CallBackendService,
    private toastController: ToastController,
    private user: UserService,
    private router: Router,
    private vibration: Vibration,
    private splash: SplashService,
    private hasInternet: InternetService,
    private utils: UtilitiesService,
    private apiRoutes: APIRouteService,
    private uxInfo: UXInfosService
  ) {
    // this.dataSource = new MyDataSource(backend);
    // The status bar color
    this.statusbar.overlaysWebView(false);
    uxInfo.appBottom.emit('show');

    // this.statusbar.styleDefault();
    // this.statusbar.backgroundColorByName('white');
    this.getConnected();
    this.routerEvents = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/home') {
          console.log('Update the connected user');
          this.getConnected();
          if (this.showErrorPane) {
            this.retry();
          }
          uxInfo.appBottom.emit('show');
        } else {
          uxInfo.appBottom.emit('hide');
        }
      }
    });
  }

  stopRequest() {
    if (this.request) {
      this.request.unsubscribe();
      this.request = null;
    }
  }

  logScrolling() {
    // console.log('Scrolling');
    // console.log(this.fenesprese);
  }

  showMoreMember() {
    this.dynamicRow = true;
  }

  getConnected() {
    this.user.getConnected().then((connected) => {
      this.connected = connected;
    });
    // this.user.updateConnected(this.connected);
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit() {
    // this.virtualScroll.approxItemHeight = 500;
    // this.virtualScroll.approxFooterHeight = 500;
    // this.virtualScroll.approxHeaderHeight = 500;
    this.reactOnConnectionChange();


  }


  ionViewDidEnter() {
    // Rerender Virtual Scroll List After Adding New Data
    // this.virtualScroll.checkEnd();
    this.showParticipants();
    this.splash.hideSplash();
    this.vibration.vibrate(100);
    // }, 500);
  }

  showParticipants() {
    // setTimeout(() => {
    this.stopRequest();
    this.request = this.backend.getParticipants(this.currentPage).subscribe(async (members) => {
      this.showLoader = false;
      if (this.connected == null) {
        this.connected = await this.user.getConnected();
      }

      members = this.removeConnected(members);

      this.obDatas.next(members);
      this.members = members;

      this.showErrorPane = false;
      if (this.members.length !== 0) {
        console.log('Increments previous page');
        this.currentPage++;
      }

      console.log('Current number of member: ' + this.members.length);
      // this.obDatas.next(this.members);
      // Rerender Virtual Scroll List After Adding New Data
      // Wait a while and rerender the view
      this.virtualScroll.checkEnd();
      // setTimeout(() => {
      //   this.virtualScroll.checkRange(0, members.length-1);
      // }, 500);
    }, (error) => {
      this.handleError();
    });
  }

  removeConnected(members) {
    return members.filter((value, index) => {
      return value.id !== this.connected.id;
    });
  }

  handleError() {
    // this.presentToast('Impossible de charger les donnees deppuis internet');
    // setTimeout(() => {
    console.log('Handle error : ' + this.members.length);
    if (this.members.length === 0) {
      this.showErrorPane = true;
    }
    // }, 500);
  }

  updateView(index, id) {
    const index2 = this.members.findIndex((value, index) => {
      console.log(value);
      return value.id == id;
    })
    console.log("Update view of : " + id + "/" +
      '\tGived index: ' + index + "  Real index" + index2);
    console



    this.virtualScroll.checkRange(index2, 1);
  }

  loadData(event) {
    this.stopRequest();

    this.request = this.backend.getParticipants(this.currentPage).subscribe((members) => {
      this.showLoader = false;

      console.log('Got response. LEngth: ' + members.length);

      members = this.removeConnected(members);

      console.log('current page');

      members.forEach((m) => {
        // setTimeout(() => {

        this.members.push(this.setImage(m));
        this.obDatas.next(this.members);
        // }, 200);
      });

      // Disable the infinite scroll
      if (this.members.length === 0) {
        event.target.disabled = true;
        console.error('disabled');
      }

      // Hide Infinite List Loader on Complete
      event.target.complete();
      // The first load succeeded, the other load wil no longuer be the frist one
      if (this.firstLoad) {
        this.firstLoad = false;
      }

      // Rerender Virtual Scroll List After Adding New Data
      this.virtualScroll.checkEnd();

      // The request is ok. move to the second page
      if (members.length !== 0) {
        this.currentPage++;
      }

      // console.log('Current number of member : ' + this.members.length);


    }, (error) => {
      this.handleError();
    });
  }

  scrolling(event) {
    if (event.detail.scrollTop > 250) {
      if (this.lastScrollTop - event.detail.scrollTop > 0) {
        this.uxInfo.appBottom.emit('show');
      } else {
        this.uxInfo.appBottom.emit('hide');
      }


    } else {
      this.uxInfo.appBottom.emit('show');
    }

    this.lastScrollTop = event.detail.scrollTop;

    this.showAction = false;
  }

  scrollEnd() {
    setTimeout(() => {
      this.showAction = true;
    }, 1000);
  }

  retry() {
    this.showErrorPane = false;
    // this.showParticipants();
  }

  reactOnConnectionChange() {
    this.connectionMonitor = this.hasInternet.connectionStatus$.subscribe(
      next => {
        if (!next.connected) {
          this.stopRequest();
          this.handleError();
        }
      }
    );
  }

  stopReactOnConnectionChange() {
    this.connectionMonitor.unsubscribe();
  }

  ngOnDestroy(): void {
    this.stopReactOnConnectionChange();
    this.routerEvents.unsubscribe();
  }

  setImage(m: MemberModel) {
    if (m.image && m.image.length) {
      m.image = this.apiRoutes.imgRouteBase + m.image;
    } else {
      m.image = 'https://fakeimg.pl/600x300/?text=Profil';
    }
    // console.log(m);
    return m;
  }

  reload() {
    this.virtualScroll.items = [];
    this.currentPage = 1;
    this.obDatas.next([]);
    this.members = [];
    this.showParticipants();
  }

  tapEvent($event) {
    console.log('tap');
  }

  swipeEvent($event) {
    console.log('swipe');
  }

}
