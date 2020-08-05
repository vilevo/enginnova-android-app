import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InternetService } from './services/internet.service';
import { Autostart } from '@ionic-native/autostart/ngx';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import { UXInfosService } from './services/ui/uxinfos.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private iconRegistry: MatIconRegistry,
    private sanitiser: DomSanitizer,
    private router: Router,
    private storage: Storage,
    private net: InternetService,
    private autoStart: Autostart,
    private location: Location,
    private uxinfo: UXInfosService
    // private orientation: ScreenOrientation
  ) {
    uxinfo.appBottom.emit('hide');
    this.initializeApp();
    this.iconRegistry.addSvgIcon(
      'custom-empty',
      this.sanitiser.bypassSecurityTrustResourceUrl('/assets/empty.svg')
    );
    this.iconRegistry.addSvgIcon(
      'custom-facebook',
      this.sanitiser.bypassSecurityTrustResourceUrl('/assets/facebook-social-logo.svg')
    );
    this.iconRegistry.addSvgIcon(
      'custom-linkedin',
      this.sanitiser.bypassSecurityTrustResourceUrl('/assets/linkedin-logo.svg')
    );
    this.iconRegistry.addSvgIcon(
      'custom-twitter',
      this.sanitiser.bypassSecurityTrustResourceUrl('/assets/twitter-logo.svg')
    );
    this.iconRegistry.addSvgIcon(
      'custom-globe',
      this.sanitiser.bypassSecurityTrustResourceUrl('/assets/globe.svg')
    );
    // this.iconRegistry.registerFontClassAlias('fa');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#097ec3');
      // this.autoStart.enable();
      this.splashScreen.hide();
      // this.orientation.
      this.platform.backButton.subscribe(() => {
        console.log('Hardware Back button pressed');
        if (this.router.url == '/home') {
          // this.platform.exitApp(); // Exit from app
          navigator['app'].exitApp(); // work for ionic 4
        }
      });
      // this.storage.set('essai', 'essai').then(_ => { console.log('OK'); });
    });
  }
}
