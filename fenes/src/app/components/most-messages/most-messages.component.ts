import { UXInfosService } from './../../services/ui/uxinfos.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessageManagerService } from 'src/app/message-manager.service';
import { UserService } from 'src/app/services/user.service';
import { MemberModel } from 'src/app/models/member-model';

@Component({
  selector: 'most-messages',
  templateUrl: './most-messages.component.html',
  styleUrls: ['./most-messages.component.scss'],
})
export class MostMessagesComponent implements OnInit {


  retrievingMessages = false;


  @Output() interested = new EventEmitter<boolean>()
  connected: MemberModel

  emitted = false;
  constructor(
    private router: Router,
    public messageManager: MessageManagerService,
    private userService: UserService,
    private uxInfo: UXInfosService,
  ) {
    userService.getConnected().then(c => {
      this.connected = c;
    })
  }

  ngOnInit() {
    this.getLastState(1);
  }

  openMsg(msg) {
    this.uxInfo.appBottom.emit('hide');
    console.log("Open message ")
    console.log(msg);
    if (msg.unread_count != 0) {
      this.messageManager.read(msg.id, this.connected.id, msg.conversation_id);
    }
    let second_member = 0;
    if (msg.is_sender) {
      second_member = msg.receiver_id;
    } else {
      second_member = msg.sender_id;
    }
    console.error("SECOND PART: " + second_member)
    this.router.navigateByUrl('conversation/' + second_member);
  }


  fireInterest() {
    // if (!this.emitted) {
    this.interested.emit(true);
    this.emitted = true;
    // }
  }


  getLastState(de) {
    this.retrievingMessages = true;
    this.messageManager.getMostMessage().subscribe(value => {
      this.retrievingMessages = false;
    });
  }
}
