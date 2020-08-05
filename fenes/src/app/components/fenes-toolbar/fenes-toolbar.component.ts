import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';

@Component({
  selector: 'fenes-toolbar',
  templateUrl: './fenes-toolbar.component.html',
  styleUrls: ['./fenes-toolbar.component.scss'],
})
export class FenesToolbarComponent implements OnInit {

  public searchBar: boolean;
  private avatar = '/assets/user_1_.png';

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private location: Location,
    private user: UserService,
    private uxInfo: UXInfosService
  ) {
    this.updateAvatar();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/home') {
          console.log('Update the connected user');
          this.updateAvatar();
        }
      }
    });
  }

  ngOnInit() {
    this.searchBar = this.router.isActive('/search', true);
  }

  updateAvatar() {
    this.user.getAvatarPath().then((path) => {
      this.avatar = path;
      console.log('The avatar path ' + this.avatar);
    }).catch(() => {
      console.log('Got wrong path');
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      animated: true,
      mode: 'ios',
      header: 'Compte Personnel',
      buttons: [{
        // text: 'Delete',
        // role: 'destructive',
        // icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        // text: 'Share',
        // icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  openPersonalPage() {
    this.router.navigateByUrl('/personal');
  }

  openSearchBar() {
    this.router.navigateByUrl('/search');
  }

  back() {
    this.location.back();
  }
}
