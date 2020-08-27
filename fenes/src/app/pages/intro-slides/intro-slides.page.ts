import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashService } from 'src/app/services/splash.service';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';

@Component({
  selector: 'app-intro-slides',
  templateUrl: './intro-slides.page.html',
  styleUrls: ['./intro-slides.page.scss'],
})
export class IntroSlidesPage implements OnInit, AfterViewInit {



  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 700,
    effect: 'fade',
    spaceBetween: 0,
    slidesPerView: 1,
    freeMode: false,
    loop: false
  };


  constructor(
    private router: Router,
    private statusbar: StatusBar,
    private splash: SplashService,
    private uxinfo: UXInfosService
  ) {
    uxinfo.appBottom.emit('hide');
  }

  ngOnInit() {

  }

  async finish() {
    // await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/sign-up');
  }

  oneSlide1() {
    // this.statusbar.backgroundColorByName('');
  }

  ngAfterViewInit(): void {
    this.splash.hideSplash();
  }
}
