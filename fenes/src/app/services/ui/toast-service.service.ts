import { Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService implements OnInit {


  defaultToast: HTMLIonToastElement;

  constructor(
    private toastController: ToastController
  ) {

  }

  async ngOnInit() {

    this.defaultToast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000,
    });
    this.defaultToast.message = 'The new message';
    console.warn(this.defaultToast);
  }

  presentDefault() {
    this.defaultToast.present();
  }

  async presentToast() {

  }
}
