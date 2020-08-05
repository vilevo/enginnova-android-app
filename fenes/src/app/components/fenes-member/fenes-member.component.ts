import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MemberModel } from 'src/app/models/member-model';
import { APIRouteService } from 'src/app/services/apiroute.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FavoriService } from 'src/app/services/favori.service';

@Component({
  selector: 'fenes-member',
  templateUrl: './fenes-member.component.html',
  styleUrls: ['./fenes-member.component.scss'],
})
export class FenesMemberComponent implements OnInit {

  more = false;

  img;
  link;

  loved;

  @Input() member: MemberModel;

  @Output() onChange = new EventEmitter<number>();
  m;


  el;
  window;
  inViewport;
  observer;

  // @ViewChild('', { read: ConnectionErrorPaneComponent, static: false }) connectErrPane: ConnectionErrorPaneComponent;

  constructor(
    private apiRoutes: APIRouteService,
    private favori: FavoriService,
    private r: ElementRef
  ) {
    this.window = window;
  }

  ngOnInit() {
    console.log('Image value: ' + this.member.image);
    console.error(this.r);
    setTimeout(() => {
      this.initIntercepterObserver();
    }, 500);
  }

  updateFavoriStatus() {

    if (this.favori.isFavoritized(this.member.id)) {
      console.log('Ahhhhh loved');
      this.loved = true;
    } else {
      console.log('Ahhhhh not loved');
    }

    if (this.member.image) {
      // setTimeout(() => {
      this.img = this.apiRoutes.imgRouteBase + this.member.id;
      // }, 5000);
    } else {
      this.img = '/assets/user_1_.png';
    }


    this.onChange.emit(this.member.id);
  }


  initIntercepterObserver() {
    const IntersectionObserver = this.window['IntersectionObserver'];
    this.observer = new IntersectionObserver(this.intersectionObserverCallback.bind(this));
    this.observer.POLL_INTERVAL = 100;
    this.observer.USE_MUTATION_OBSERVER = false;
    this.observer.observe(this.r.nativeElement.firstElementChild);
  }



  intersectionObserverCallback(entries) {
    console.log('intersectionObserverCallback')
    entries.forEach((entry: IntersectionObserverEntry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        console.log('intercepttttttt');
        this.updateFavoriStatus();
        return;
      }
    });
  }
  // toggleLoved(love = true) {
  //   this.loved = love;
  // }

  save() {
    console.log(this.member);
    // this.start = true;
    if (!this.favori.isFavoritized(this.member.id)) {
      this.favori.favori(this.member).then(_ => {
        // this.start = false;
        this.loved = true;
        console.log('Ok favori');
        this.onChange.emit(this.member.id);
      }).catch(error => {
        console.log('Not OK');
        console.log(error);
      });
    } else {
      this.favori.unFavori(this.member.id).then(_ => {
        // this.start = false;
        this.loved = false;
        console.log('Ok unfavori');
        this.onChange.emit(this.member.id);
      }).catch(error => {
        console.log('Not OK');
        console.log(error);
      });
    }
  }
}
