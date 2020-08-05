import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';
import { MessageManagerService } from 'src/app/message-manager.service';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.scss'],
})
export class BottomComponent implements OnInit {

  noRest = false;
  semiRest = false;
  rest = true;

  covid = false;


  mostMessages = false;
  mostNews = false;
  mostPosts = false;

  // @ViewChild('ele', { static: true }) mini1: HTMLElement;
  constructor(
    private router: Router,
    private uxInfo: UXInfosService,
    private messageManager: MessageManagerService
  ) {
    this.messageManager.getMostMessage().subscribe();
  }

  ngOnInit() {

    this.uxInfo.appBottom.subscribe(value => {
      if (value == "show") {
        this.goRest();
      } else {
        this.hide();
      }
    })

  }

  openPerso() {
    this.router.navigateByUrl('/personal')
  }


  hide() {
    this.noRest = false;
    this.semiRest = false;
    this.rest = false;
    this.covid = true;

    // console.error('HHHHHHHHHIDEEEEEEEE TTTTTTTTTTHEEEEEEEEE BBBBBBBOOOOOOTTTOM')
  }


  goHome() {
    this.noRest = false;
    this.semiRest = false;
    this.rest = true;
    this.covid = false;
  }


  goSemi(type) {
    this.covid = false;
    if (type == 'message') {
      this.mostMessages = true;
      this.mostNews = false;
      this.mostPosts = false;
    }
    else if (type == 'news') {
      this.mostMessages = false;
      this.mostNews = true;
      this.mostPosts = false;
    } else if (type == 'posts') {
      this.mostMessages = false;
      this.mostNews = false;
      this.mostPosts = true;
    }

    if (!this.noRest) {
      this.semiRest = true;
      this.rest = false;
    }

  }

  goRest() {
    // console.log('GO REST');
    this.noRest = false;
    this.semiRest = false;
    this.rest = true;
    this.covid = false;
  }

  goNoRest() {
    // console.log('DDDDDDDDD')
    this.noRest = true;
    this.semiRest = false;
    this.rest = false;
    this.covid = false;
  }

}
