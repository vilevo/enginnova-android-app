import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CallBackendService } from 'src/app/services/api/call-backend.service';
import { interval } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'src/app/services/ui/notifications.service';

@Component({
  selector: 'most-posts',
  templateUrl: './most-posts.component.html',
  styleUrls: ['./most-posts.component.scss'],
})
export class MostPostsComponent implements OnInit {

  @Output() interested = new EventEmitter<boolean>()

  emitted = false;



  news;
  constructor(
    private backend: CallBackendService,
    private user: UserService,
    private notif: NotificationsService
  ) { }

  user_id;

  ngOnInit() {


    this.notif.data.subscribe(ss => {
      this.news = ss;
    })


  }



  fireInterest() {

    // if (!this.emitted) {
    this.interested.emit(true);
    this.emitted = true;
    // }
  }

}
