import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { MessageManagerService } from 'src/app/message-manager.service';

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
  msgList = [];

  constructor(
    private messageManger: MessageManagerService
  ) {

  }

  sending = false;

  ngOnInit() {
    this.messageManger.getRecentMessages(7).subscribe(msgs => {
      console.log(msgs);
      msgs.forEach(m => {
        this.msgList.push(m);
      });
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



  sendMsg() {

    this.msgList.push({
      userId: this.User,
      userName: this.User,
      userAvatar: "assets/user.jpeg",
      time: "12:01 pm",
      message: this.inp_text,
      upertext: this.inp_text,
      status: 'sending'
    });

    this.messageManger.sendMessage({
      conversation_id: 1,
      content: this.inp_text,
      sender_id: 2
    }).subscribe((value) => {
      this.msgList[this.msgList.length - 1].status = 'sent';
    }, error => {
      this.msgList[this.msgList.length - 1].status = 'error';
    });

    this.inp_text = "";
    setTimeout(() => {
      this.scrollToBottom()
    }, 10)
  }

}
