import { Injectable, EventEmitter } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})

export class InternetService {

  connected = false;

  connectionStatus$ = new EventEmitter<any>();

  constructor(
    net: Network
  ) {

    net.onConnect().subscribe((value) => {
      console.log('COnnected to internet');
      console.log(value);
      this.connected = true;
      this.connectionStatus$.emit({
        connected: true,
        value
      });
    });
    net.onDisconnect().subscribe((value) => {
      console.log('Disconnected from internet');
      console.log(value);
      this.connected = true;
      this.connectionStatus$.emit({
        connected: true,
        value
      });
    });
  }

  /**
   * Check if the user is connected to internet
   */
  isConnected(): boolean {
    return this.connected;
  }

}
