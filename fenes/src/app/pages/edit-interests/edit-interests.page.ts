import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserService } from 'src/app/services/user.service';
import { MemberModel } from 'src/app/models/member-model';
import { AlertController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';
import { Router } from '@angular/router';
import { ItemChooserService } from 'src/app/services/ui/item-chooser.service';
import { map } from 'rxjs/operators';
import { UtilitiesService } from 'src/app/services/utilities.service';


@Component({
  selector: 'app-edit-interests',
  templateUrl: './edit-interests.page.html',
  styleUrls: ['./edit-interests.page.scss'],
})
export class EditInterestsPage implements OnInit, OnDestroy {
  interest = '';

  toremove = [];

  interlist = [];
  updatedInter = [];


  connected: MemberModel;

  initialInterSize = 0;

  request: Subscription;
  modification: Subscription;

  existed = [];
  recentlyAdded = [];

  constructor(
    private location: Location,
    private user: UserService,
    public alertController: AlertController,
    private platform: Platform,
    private uxInfosService: UXInfosService,
    private router: Router,
    private itemModified: ItemChooserService,
    private utils: UtilitiesService
  ) {
    this.initialInterSize = this.interlist.length;
  }

  async ngOnInit() {
    this.updateInterList()
    this.onInterestModified();
  }

  ngOnDestroy(): void {
    console.log('Unregister back button');
    this.platform.backButton.unsubscribe();
    if (this.modification) {
      this.modification.unsubscribe();
    }
  }

  submit() {
    console.log('Submit');
    // console.log(connected);
    // Add the interest in the form
    this.add();

    let usefull = false;

    const toremove = this.getInterestsToRemove();
    const toadd = this.getInterestsToAdd();


    this.uxInfosService.startLoading();

    if (toremove.length !== 0 && toadd.length === 0) {
      // REmove only
      console.log('Remove Interest only');
      this.removeInterests(toremove).subscribe(result => {
        this.uxInfosService.showOkay();
      }, error => {
        this.onNotUsefull();
      });

    } else if (toremove.length === 0 && toadd.length !== 0) {
      // Add interests only
      console.log('Add INterests only');
      this.addInterests(toadd).subscribe(result => {
        this.uxInfosService.showOkay();
      }, error => {
        this.onNotUsefull();
      });
    } else if (toremove.length && toadd.length) {
      // Both, remove then add
      console.log('REmove and add interests');
      this.removeInterests(toremove).subscribe(r1 => {
        this.addInterests(toadd).subscribe(r2 => { }, error => {
          this.onNotUsefull();
        });
      }, error => {
        this.onNotUsefull();
      });
    } else {
      this.onNotUsefull();
    }

    return true;
  }

  onNotUsefull() {
    setTimeout(() => {
      this.uxInfosService.showError();
      console.log('DO something to indicate it');
      this.uxInfosService.vibrateError();
    }, 500);
  }

  onInvalid() {
    console.log('Invalid data set');
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  add() {
    if (this.interest && !this.utils.contains(this.interlist, this.interest)) {
      console.log('Add item');
      this.interlist.push(this.interest);
      this.recentlyAdded.push(this.interest);
      this.interest = '';
    } else {
      this.uxInfosService.vibrateError();
    }
  }

  removeInterests(toremove) {
    return this.user.removeInterests(toremove).pipe(
      map(rep => {
        console.log('Removed... OK');
        this.toremove = [];
        this.request = null;
      }, error => {
        // TODO Show error msg. will retry later
        console.log(error);
        this.request = null;
      })
    );
  }

  addInterests(toadd) {
    return this.user.addInterests(toadd).pipe(
      map(rep => {
        console.log('ADDED.... OK');
        this.updateInterList();
        this.request = null;
        this.recentlyAdded = [];
      }, error => {
        // TODO Show error msg. will retry later
        console.log(error);
        this.request = null;
      })
    );
  }


  updateInterList() {
    this.interlist = [];
    this.user.getConnected().then(c => {
      // console.log(this.connected);
      c.interests.forEach(c => {
        this.interlist.push(c);
        this.existed.push(c);
      });
      this.connected = this.connected;
    })
  }


  back() {
    if (this.request) {
      this.request.unsubscribe();
    }
    this.location.back();
  }

  openInterestChooser() {
    this.router.navigateByUrl('/item-chooser/5');
  }

  onInterestModified() {
    this.modification = this.itemModified.interests$.subscribe((value) => {
      console.log('value received');
      this.interest = value;
    });
  }

  async goBack() {
    const alert = await this.alertController.create({
      header: 'Pas si vite !',
      message: 'Abandonner les <strong color=\'danger\'>modifications</strong>?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            console.log('Confirm Okay');
            this.location.back();
          }
        }, {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    if (this.recentlyAdded.length || this.toremove.length) {
      await alert.present();
    } else {
      this.back();
    }
  }


  getInterestsToRemove() {
    // These interests are present in the interlist
    // and are also present in the to remove
    const r = this.utils.allOfIn(this.existed, this.toremove);
    console.log('Interests to remove');
    console.log(r);
    return r;
  }

  getInterestsToAdd() {
    // These interests are present in the recently added
    // and are not present in the interlist
    const r = this.utils.allOfNotIn(this.recentlyAdded, this.toremove);
    // r = this.utils.allOfNotIn(r, this.toremove);
    console.log('Interests to add');
    console.log(r);
    return r;
  }
}
