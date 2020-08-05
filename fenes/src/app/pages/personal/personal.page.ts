import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {

  connected = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location,
    private alertController: AlertController
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/personal') {
          console.log('Update the connected user');
          this.getConnected();
        }
      }
    });
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.getConnected();
  }

  async getConnected() {
    this.connected = await this.userService.getConnected();
    console.log('Updated the connected user');
    console.log(this.userService);
  }

  ngOnInit() {

  }

  back() {
    this.router.navigateByUrl('home');
  }

  async popLogout() {
    const alert = await this.alertController.create({
      header: 'Pas si vite',
      message: 'Voulez-vous vous deconnecter de l\'application ?',
      buttons: [{
        text: 'Oui',
        role: 'ok',
        handler: () => {
          this.userService.logout();

          // TODO:  Exit the app. To fix a bug. Don't not yet know how
          // to clean the home screen virtual screen cache
          setTimeout(() => {
            navigator['app'].exitApp(); // work for ionic 4
          }, 2000);
        }
      },
      {
        text: 'Non',
        handler: () => {
          console.log('Do nothing');
        }
      }]
    });

    await alert.present();

  }
}
