import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonContent, IonTextarea } from '@ionic/angular';
import { MessageManagerService } from 'src/app/message-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberModel } from 'src/app/models/member-model';
import { UserService } from 'src/app/services/user.service';
import { UniqueIdService } from 'src/app/services/unique-id.service';

import * as moment from 'moment';
import 'moment/locale/pt-br';

export class Message {
  uniqueId?
  userId?
  userName?
  userAvatar?
  time
  body
  upertext?
  type?
  status?
  id
  owner: boolean
}

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})


export class ConversationPage implements OnInit {

  @ViewChild('content', { static: true }) content: IonContent;
  @ViewChild('chat_input', { static: true }) messageInput: ElementRef;
  User: string = "Me";
  toUser: string = "driver";
  inp_text: any;
  editorMsg = '';
  showEmojiPicker = false;
  msgList: Array<Message> = [];
  downloadRecent: "none" | 'ing' | "done" | 'error';

  from: MemberModel
  to = new MemberModel();

  id = 0;

  constructor(
    private messageManger: MessageManagerService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private uniqueId: UniqueIdService,
    private router: Router
  ) {
    moment.locale('fr');
    this.userService.getConnected().then(c => {
      this.from = c;

      this.activatedRoute.params.subscribe(params => {
        if (params.id) {
          this.to.id = params.id;
          // Load recent message from the server
          this.conversationsBetween();
        }
      });
    });
  }

  sending = false;

  ngOnInit() {

  }

  conversationsBetween() {
    this.downloadRecent = 'none';
    this.messageManger.getRecentMessages(this.from.id, this.to.id).subscribe(r => {
      console.log(r);
      this.downloadRecent = 'done';
      this.id = r.id;
      r.messages.forEach(m => {
        this.msgList.push({
          id: m.id,
          body: m.body,
          status: null,
          time: moment(m.date).fromNow(),
          uniqueId: null,
          owner: (m.sender_id == this.from.id)
        });
      });
    }, error => {
      this.downloadRecent = 'error';
    })
  }

  scrollToBottom() {
    this.content.scrollToBottom(100);
  }

  ionViewWillLeave() {
    // this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    console.log('scrollBottom');
    setTimeout(() => {
      this.scrollToBottom()
    }, 500)
    console.log('scrollBottom2');
  }

  logScrollStart() {
    console.log('logScrollStart');
    document.getElementById('chat-parent');
  }

  logScrolling(event) {
    console.log('event', event)
  }

  // 'id' => $msg-> id,
  //   'type' => $msg -> type,
  //     'body' => $msg -> body,
  //       'date' => $msg -> created_at

  sendMsg() {
    const m: Message = {
      id: null,
      uniqueId: this.uniqueId.get(),
      userId: this.User,
      userName: this.User,
      userAvatar: "assets/user.jpeg",
      time: moment(moment.now()).fromNow(),
      body: this.inp_text,
      upertext: this.inp_text,
      type: 'text',
      owner: true
    }
    this.msgList.push(m);

    this.messageManger.sendMessage({
      conversation_id: this.id,
      text: this.inp_text,
      sender_id: this.from.id
    }).subscribe((value) => {
      const sent = this.msgList.find((v) => {
        return v.uniqueId == m.uniqueId;
      })
      sent.status = 'sent';
      sent.id = value['id'];
    }, error => {
      const sent = this.msgList.find((v) => {
        return v.uniqueId == m.uniqueId;
      })
      sent.status = 'error';
    });

    this.inp_text = "";
    setTimeout(() => {
      this.scrollToBottom()
    }, 10)
  }


  openDetail() {
    // event.stopPropagation();
    // this.save();
    this.router.navigateByUrl('/detail/' + this.to.id);
  }

}
