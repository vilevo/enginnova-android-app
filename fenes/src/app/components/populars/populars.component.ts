import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides, PopoverController } from '@ionic/angular';
import { CallBackendService } from 'src/app/services/api/call-backend.service';
import { Router } from '@angular/router';
import { MemberPopupComponent } from '../member-popup/member-popup.component';

@Component({
  selector: 'populars',
  templateUrl: './populars.component.html',
  styleUrls: ['./populars.component.scss'],
})
export class PopularsComponent implements OnInit {

  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    effect: 'fade',
    spaceBetween: 5,
    slidesPerView: 3,
    freeMode: false,
    loop: false,
  };

  @Input() popular = true;

  populars = [];

  @ViewChild('slides', { read: IonSlides, static: true }) slides: IonSlides

  constructor(
    private backend: CallBackendService,
    private router: Router,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    // this.slides.startAutoplay();
    let o = this.backend.popularParticipants();
    if (this.popular == false) {
      o = this.backend.newParticipants()
    }
    o.subscribe((participants: []) => {
      console.log(participants);
      this.populars = participants;
    }, error => {
      console.error(error);
    });
  }

  goDetail(id) {
    this.router.navigateByUrl('detail/' + id);
  }

  async showMore(event, item) {
    const popover = await this.popoverController.create({
      componentProps: {
        member: item
      },
      component: MemberPopupComponent,
      event: event,
      translucent: false,
    });

    await popover.present();
  }

  async presentPopover(ev: any) {

  }
}
