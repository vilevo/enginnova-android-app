import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessageManagerService } from 'src/app/message-manager.service';

@Component({
  selector: 'most-messages',
  templateUrl: './most-messages.component.html',
  styleUrls: ['./most-messages.component.scss'],
})
export class MostMessagesComponent implements OnInit {


  retrievingMessages = false;


  @Output() interested = new EventEmitter<boolean>()

  emitted = false;
  constructor(
    private router: Router,
    private messageManager: MessageManagerService
  ) { }

  ngOnInit() {
    this.getLastState();
  }

  openMsg(id) {
    this.messageManager.read(id);
    this.router.navigateByUrl('conversation')

  }


  fireInterest() {
    // if (!this.emitted) {
    this.interested.emit(true);
    this.emitted = true;
    // }
  }


  getLastState() {
    this.retrievingMessages = true;
    this.messageManager.getMostMessage().subscribe(value => {
      this.retrievingMessages = false;
    });
  }
}
