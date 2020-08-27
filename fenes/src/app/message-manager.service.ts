import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CallBackendService } from './services/api/call-backend.service';
import { UserService } from './services/user.service';
import { UniqueIdService } from './services/unique-id.service';

@Injectable({
  providedIn: 'root'
})
export class MessageManagerService {
  store = [];
  nbNew = 0;

  interval = interval(60000);


  constructor(
    private callBackend: CallBackendService,
    private userService: UserService,
    private uniqueId: UniqueIdService
  ) {
    this.interval.subscribe(() => {
      this.getMostMessage().subscribe();
    });
  }

  getMostMessage() {
    // this.nbNew = 0;
    return this.callBackend.recentMessages(this.userService.connected.id).pipe(
      map((value: []) => {
        this.nbNew = 0;
        this.store.splice(0, this.store.length);
        value.forEach((b: any) => {
          this.store.push({
            id: b.last_message.id,
            unread_count: b.unread_count,
            content: b.last_message.body,
            time: b.last_message.date,
            receiver_id: b.last_message.receiver_id,
            participation_id: b.participation_id,
            conversation_id: b.conversation_id,
            is_sender: b.is_sender,
            sender_id: b.from_id,
            sender_name: b.from_email
          });
          if (b.unread_count !== 0) {
            this.nbNew++;
          }
        });
        console.log(this.store);
        return this.store;
      })
    );
  }

  getRecentMessages(from, to) {
    return this.callBackend.conversationsBetween(from, to).pipe(
      map((value: any) => {
        return {
          id: value.id,
          messages: value.messages
        };
      })
    );
  }

  sendMessage(msg: {
    conversation_id,
    sender_id,
    text,

  }) {
    return this.callBackend.sendTextMessageIn(msg.conversation_id, msg.sender_id, msg.text).pipe(
      delay(700),
      map(value => {
        console.log(value);
        // Attribute a local id to the msg
        return true;
      })
    );
  }

  /**
   *
   * @param from the sender member id
   * @param to the receiver member id
   */
  openConversation(from, to) {
    // If has an unread message
    // const s = this.read(to);

    // And nothing. The conversation will be created after the first sent msg

  }


  read(msgId, id, convId) {
    const index = this.store.findIndex(value => {
      return value.id === msgId;
    });
    if (index !== -1) {
      // Update on the server before decreasing
      console.log('Update on the server before decreasing ');
      return this.callBackend.readAllMessageInConversation(id, convId).pipe(
        map(value => {
          console.log('READ SUCCESS ON THE SERVER');
          console.log(this.store);
          if (this.store[index].count !== 0 && this.nbNew !== 0) {
            this.nbNew--;
          }
          this.store[index].count = 0;
          this.store = this.store.sort((a, b) => {
            return b.count - a.count;
          });
        })
      ).subscribe();
    }
  }
}

