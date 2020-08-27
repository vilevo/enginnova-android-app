import { Injectable, EventEmitter } from '@angular/core';
import { interval } from 'rxjs';
import { CallBackendService } from '../api/call-backend.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public count = 0;

  rythm = interval(20000);

  data = new EventEmitter(true);

  user_id;

  constructor(
    private backend: CallBackendService,
    private user: UserService
  ) {

    this.user.getConnected().then(u => {
      this.user_id = u.id;
      this.update();
    });


    this.rythm.subscribe(_ => {
      this.update();
    })

  }

  update() {
    // this.backend.getParticipations(this.user_id).subscribe((part: []) => {
    //   this.count = part.length;
    //   this.data.emit(part);
    // });
  }


}
