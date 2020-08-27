import { MemberModel } from 'src/app/models/member-model';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from './../../models/user-model';
import { CallBackendService } from 'src/app/services/api/call-backend.service';
import { APIRouteService } from 'src/app/services/apiroute.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import 'moment/locale/pt-br';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
// import {} from "@ionic-native/autostart"


@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  user: MemberModel;

  @Input() p = true;
  @Input() value;

  dateForHuman;

  constructor(
    private router: Router,
    private inAppBrowser: InAppBrowser,
    private server: APIRouteService,
    private backend: CallBackendService,
    private userService: UserService

  ) {
    moment.locale('fr');

  }

  ngOnInit() {
    this.dateForHuman = moment(this.value.created_at).fromNow();
    this.userService.getConnected().then(c => {
      this.user = c;
    })
  }

  open(event) {
    event.stopPropagation();
    console.log('Ouvrir ce post dans le navigateur');
    if (this.p) {

      this.backend.getPostUrl(this.value.id_post, this.user.id).subscribe((res: any) => {
        this.inAppBrowser.create(res.link);
      });

    } else {
      this.backend.getPostUrl(this.value.id_fprojet, this.user.id).subscribe((res: any) => {
        this.inAppBrowser.create(res.link);
      });
    }
  }

  like(event: CustomEvent) {
    event.stopPropagation();
    // if (this.value.liked) {
    //   this.value.nb_liked--;
    // } else {
    //   this.value.nb_liked++;
    // }
    // this.value.liked = !this.value.liked;

    this.open(event);

  }

  comment(event) {
    // this.router.navigateByUrl('comment-post/10/true');
    // this.inAppBrowser.create('http://localhost:8000/redirect/post/20000');
    event.stopPropagation();
    this.open(event);
  }

  postuler(event) {
    event.stopPropagation();

    // this.value.postuled = !this.value.postuled;
    this.open(event);
  }

  share(event) {
    event.stopPropagation();

  }

  viewUser(event) {
    event.stopPropagation();
    // this.router.navigateByUrl('comment-post/10/true');
  }

  doComments(event) {
    event.stopPropagation();
    this.open(event);
    // this.router.navigateByUrl('comment-post/10/true');
  }
}
