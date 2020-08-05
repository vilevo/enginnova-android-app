import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map, windowTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageManagerService {
  static unique = 1;
  store = [];
  nbNew = 0;

  constructor() {

  }


  private uniqueId() {
    return MessageManagerService.unique += 1;
  }

  getMostMessage() {
    // this.nbNew = 0;
    return of(this.sample).pipe(
      delay(700),
      map(value => {
        value = [];
        this.nbNew = 0;
        this.store = value;
        this.store.forEach(value => {
          if (value.count != 0) {
            this.nbNew++;
          }
        })
        return value;
      })
    )
  }

  getRecentMessages(conversation_id) {
    return of(this.conversations).pipe(
      delay(700),
      map(value => {
        value.forEach(v => {
          v.localId = this.uniqueId();
        })
        return value;
      })
    )
  }

  sendMessage(msg: {
    conversation_id,
    sender_id,
    content,

  }) {
    return of('').pipe(
      delay(700),
      map(value => {
        // Attribute a local id to the msg
        return true;
      })
    )
  }


  read(id) {
    const index = this.store.findIndex(value => {
      return value.id == id;
    });
    if (index != -1) {
      console.log(this.store);
      if (this.store[index].count != 0) {
        this.nbNew--;
      }
      this.store[index].count = 0;
    }
    this.store = this.store.sort((a, b) => {
      return b.count - a.count;
    });
  }

  sample =
    [
      {
        id: 1,
        from: "Prenom nom 1",
        content: "Lorem ipsum dolor sit amet",
        count: 1,
        avatar: "/assets/user_1.png",
        time: "21:20",
        conversation: 10
      },
      {
        id: 2,
        from: "Prenom nom 2",
        content: "Lorem ipsum dolor sit amet",
        count: 3,
        avatar: "/assets/user_1.png",
        time: "21:20",
        conversation: 13
      },
      {
        id: 3,
        from: "Prenom nom 3",
        content: "Lorem ipsum dolor sit amet",
        count: 1,
        avatar: "/assets/user_1.png",
        time: "21:20",
        conversation: 16
      },
      {
        id: 4,
        from: "Prenom nom 4",
        content: "Lorem ipsum dolor sit amet",
        count: 1,
        avatar: "/assets/user_1.png",
        time: "21:20",
        conversation: 18
      },
      {
        id: 5,
        from: "Prenom nom 5",
        content: "Lorem ipsum dolor sit amet",
        count: 0,
        avatar: "/assets/user_1.png",
        time: "21:20",
        conversation: 22
      },
      {
        id: 6,
        from: "Prenom nom 6",
        content: "Lorem ipsum dolor sit amet",
        count: 0,
        avatar: "/assets/user_1.png",
        time: "21:20",
        conversation: 24
      },
      {
        id: 7,
        from: "Prenom nom 7",
        content: "Lorem ipsum dolor sit amet",
        count: 0,
        avatar: "/assets/user_1.png",
        time: "21:20",
        conversation: 27
      },
      {
        id: 8,
        from: "Prenom nom 8",
        content: "Lorem ipsum dolor sit amet",
        count: 0,
        avatar: "/assets/user_1.png",
        time: "21:20",
        conversation: 28
      }
    ];

  conversations = [
    {
      localId: 0,
      userId: '',
      userName: 'Nom prenom',
      userAvatar: "assets/driver.jpeg",
      time: "12:01 pm",
      message: 'Hey, that\'s an awesome chat UI',
      upertext: 'Hello',
      status: 'sent'
    },
    {
      localId: 0,
      // userId: this.toUser,
      userName: 'Nom prenom',
      userAvatar: "assets/user.jpeg",
      time: "12:01 pm",
      message: "Right, it totally blew my mind. They have other great apps and designs too!",
      upertext: "Hii",
      status: 'received'
    },
    {
      localId: 0,
      // userId: this.User,
      userName: 'Nom prenom',
      userAvatar: "assets/driver.jpeg",
      time: "12:01 pm",
      message: 'And it is free ?',
      upertext: 'How r u ',
      status: 'sent'
    },
    {
      localId: 0,
      // userId: this.toUser,
      userName: 'Nom prenom',
      userAvatar: "assets/user.jpeg",
      time: "12:01 pm",
      message: 'Yes, totally free. Beat that !',
      upertext: 'good',
      status: 'received'
    },
    {
      localId: 0,
      // userId: this.User,
      userName: 'Nom prenom',
      userAvatar: "assets/driver.jpeg",
      time: "12:01 pm",
      message: 'Wow, that\'s so cool. Hats off to the developers. This is gooood stuff',
      upertext: 'How r u ',
      status: 'sent'
    },
    {
      localId: 0,
      // userId: this.toUser,
      userName: 'Nom prenom',
      userAvatar: "assets/user.jpeg",
      time: "12:01 pm",
      message: 'Check out their other designs.',
      upertext: 'good',
      status: 'received'
    },
    {
      localId: 0,
      // userId: this.User,
      userName: 'Nom prenom',
      userAvatar: "assets/driver.jpeg",
      time: "12:01 pm",
      message: 'Have you seen their other apps ? They have a collection of ready-made apps for developers. This makes my life so easy. I love it! ',
      upertext: 'How r u ',
      status: 'sent'
    },
    {
      localId: 0,
      // userId: this.toUser,
      userName: 'Nom prenom',
      userAvatar: "assets/user.jpeg",
      time: "12:01 pm",
      message: 'Well, good things come in small package after all',
      upertext: 'good',
      status: 'received'
    },
  ];
}

