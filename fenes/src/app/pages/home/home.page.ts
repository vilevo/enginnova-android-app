
import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, OnChanges, SimpleChanges, } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FenesPresentatorsComponent } from 'src/app/components/fenes-presentators/fenes-presentators.component';
import { CallBackendService } from 'src/app/services/api/call-backend.service';
import { ToastController, IonInfiniteScroll, IonContent, IonSegment, IonSlides, AlertController, Platform } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { MemberModel } from 'src/app/models/member-model';
import { Router, NavigationStart } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { SplashService } from 'src/app/services/splash.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InternetService } from 'src/app/services/internet.service';
import { Subscription, Observable } from 'rxjs';
import { ConnectionErrorPaneComponent } from 'src/app/components/connection-error-pane/connection-error-pane.component';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { APIRouteService } from 'src/app/services/apiroute.service';
import { BottomComponent } from 'src/app/components/bottom/bottom.component';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';
import { MessageManagerService } from 'src/app/message-manager.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // changeDetection: ChangeDetectionStrategy.Default,
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

  @ViewChild
    (BottomComponent, { static: false }) appBottom: BottomComponent;


  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  currentPage = 1;
  nextPage = null;

  public topNav = false;

  public navValue: 'posts' | 'annonces' = 'posts';

  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    effect: 'slide',
    spaceBetween: 8,
    slidesPerView: 1,
    freeMode: true,
    loop: true
  };

  public firstLoad = true;
  public showAction = true;
  // public initialMember = [];
  // public members = [];


  posts = [];
  annonces = [];

  toshow = [];

  public showLoader = true;
  public showErrorPane = false;
  connected: MemberModel;
  connectionMonitor: Subscription;
  private request: Subscription;
  private routerEvents: Subscription;

  // private dataSource: MyDataSource;

  // private obDatas = new Subject();

  private lastScrollTop = 0;

  constructor(
    private statusBar: StatusBar,
    private backend: CallBackendService,
    private toastController: ToastController,
    private user: UserService,
    private router: Router,
    private vibration: Vibration,
    private splash: SplashService,
    private hasInternet: InternetService,
    private utils: UtilitiesService,
    private apiRoutes: APIRouteService,
    private uxInfo: UXInfosService,
    private messageManager: MessageManagerService,
    private alertController: AlertController,

    private _platform: Platform,
  ) {
    this.getConnected();
    this._platform.ready().then(() => {
      // this._statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#0059ff');
    });
  }

  stopRequest() {
    if (this.request) {
      this.request.unsubscribe();
      this.request = null;
    }
  }


  getConnected() {
    this.user.getConnected().then((connected) => {
      this.connected = connected;
    });
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit() {
    this.reactOnConnectionChange();
    this.uxInfo.appBottom.emit('show');


    this.routerEvents = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/home') {
          console.log('Update the connected user');
          this.getConnected();
          if (this.showErrorPane) {
            this.retry();
          }
          this.uxInfo.appBottom.emit('show');
        } else {
          this.uxInfo.appBottom.emit('hide');
        }
      }
    });


  }


  ionViewDidEnter() {
    // Rerender Virtual Scroll List After Adding New Data
    // this.virtualScroll.checkEnd();
    this.showParticipants();
    this.splash.hideSplash();
    // }, 500);
  }

  showParticipants() {
    this.currentPage = 1;
    const navValue = this.navValue;
    // setTimeout(() => {
    this.stopRequest();
    this.showErrorPane = false;

    this.showLoader = true;
    let ob: Observable<any>;
    if (navValue === 'posts') {
      ob = this.user.getPosts(null, true);
    } else {
      ob = this.user.getAnnonces(null, true);
    }

    this.request = ob.subscribe(async (result: any) => {
      this.showLoader = false;


      if (navValue === 'posts') {
        this.posts = result.posts;
        this.toshow = this.posts;
      } else {
        this.annonces = result.freelance_projets;
        this.toshow = this.annonces;
      }

      // this.nextPage = 

      this.showErrorPane = false;
      if (this.toshow.length !== 0) {
        console.log('Will load next page');
        this.currentPage++;
      }

    }, (error) => {
      this.handleError();
    });
  }

  handleError() {
    // this.displayError();
    // setTimeout(() => {


    if (this.posts.length === 0 || this.annonces.length === 0) {
      this.showErrorPane = true;
    }
    // }, 500);
  }

  async displayError() {
    this.alertController.dismiss();
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Ooops',
      message: 'Impossible de contacter nos serveurs. Verifiez votre connexion internet',
      buttons: [
        {
          text: "D'accord",
          handler: (value) => {
            // this.retry();
          }
        },
        {
          text: "Reessayer",
          handler: (value) => {
            this.retry();
          }
        }
      ]
    });

    await alert.present();
  }

  loadData(event) {
    console.log("LOOOOOOD NEEEEXT")
    console.log(this.navValue);
    const navValue = this.navValue;
    this.stopRequest();

    let ob: Observable<any>;
    if (navValue === 'posts') {
      ob = this.user.getPosts(null, true);
    } else {
      ob = this.user.getAnnonces(null, true);
    }

    this.request = ob.subscribe((members: []) => {
      this.showLoader = false;

      console.log('Got response. LEngth: ' + members.length);


      members.forEach(m => {
        if (navValue === 'posts') {
          this.posts.push(m);
        } else {
          this.annonces.push(m);
        }
      });

      if (navValue === 'posts') {
        this.toshow = this.posts;
      } else {
        this.toshow = this.annonces;
      }

      // Disable the infinite scroll
      // if (this.posts.length === 0 || this.annonces.length === 0) {
      //   event.target.disabled = true;
      //   console.error('disabled');
      // }

      // Hide Infinite List Loader on Complete
      event.target.complete();
      // The first load succeeded, the other load wil no longuer be the frist one
      if (this.firstLoad) {
        this.firstLoad = false;
      }

      // The request is ok. move to the second page
      if (members.length !== 0) {
        this.currentPage++;
      }

      if (navValue === 'posts') {
        console.log('Current number of POSTS : ' + this.toshow.length);
      } else {
        console.log('Current number of ANNONCES : ' + this.toshow.length);
      }

    }, (error) => {
      this.handleError();
    });
  }

  updateValues($event) {
    this.ionContent.scrollToPoint(0, 344, 300);
    // if (this.navValue === 'posts') {
    //   this.slides.slideTo(1);
    // } else {
    //   this.slides.slideTo(2);
    // }

    this.showParticipants();

  }

  scrolling(event: CustomEvent, top: IonSegment, body: IonSegment) {
    // console.log(this.lastScrollTop - event.detail.scrollTop);
    if (event.detail.scrollTop > 250) {
      if (this.lastScrollTop - event.detail.scrollTop > 1) {
        this.uxInfo.appBottom.emit('show');
      } else if (this.lastScrollTop - event.detail.scrollTop > -10) {
        this.uxInfo.appBottom.emit('hide');
      }
    } else {
      this.uxInfo.appBottom.emit('show');
    }

    this.lastScrollTop = event.detail.scrollTop;

    this.showAction = false;
    if (event.detail.scrollTop > 344) {
      this.topNav = true;
    } else if (event.detail.scrollTop < 280) {
      this.topNav = false;
    }
  }

  retry() {
    this.showErrorPane = false;
    this.showParticipants();
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

  // setImage(m: MemberModel) {
  //   if (m.image && m.image.length) {
  //     m.image = this.apiRoutes.imgRouteBase + m.image;
  //   } else {
  //     m.image = 'https://fakeimg.pl/600x300/?text=Profil';
  //   }
  //   // console.log(m);
  //   return m;
  // }

  reload() {
    this.currentPage = 1;
    // this.obDatas.next([]);
    if (this.navValue === 'posts') {
      this.posts = [];
    } else {
      this.annonces = [];
    }

    this.showParticipants();
  }

  openSearchBar() {
    this.router.navigateByUrl('/search');
  }

}
