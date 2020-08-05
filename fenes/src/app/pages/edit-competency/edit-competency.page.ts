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
  selector: 'app-edit-competency',
  templateUrl: './edit-competency.page.html',
  styleUrls: ['./edit-competency.page.scss'],
})
export class EditCompetencyPage implements OnInit, OnDestroy {

  competency = '';

  toremove = [];

  compelist = [];

  connected: MemberModel;
  initialCompeSize = 0;

  request: Subscription;
  modification: Subscription;

  existed = [];
  recentlyadded = [];

  constructor(
    private location: Location,
    private user: UserService,
    private alertController: AlertController,
    private platform: Platform,
    private uxInfosService: UXInfosService,
    private router: Router,
    private itemModified: ItemChooserService,
    private utils: UtilitiesService
  ) {
  }

  async ngOnInit() {
    this.connected = await this.user.getConnected();
    this.updateCompeList();
    this.initialCompeSize = this.compelist.length;
    console.log(this.compelist);
    this.onCompetencyModified();
  }

  ngOnDestroy(): void {
    console.error('Unregister back button');
    this.platform.backButton.unsubscribe();
    if (this.modification) {
      this.modification.unsubscribe();
    }
  }

  submit() {
    console.log('Submit');
    // console.log(connected);
    // Add the competency in the form
    this.add();

    let usefull = false;

    const toremove = this.getCompetenciesToRemove();
    const toadd = this.getCompetenciesToAdd();


    this.uxInfosService.startLoading();

    if (toremove.length !== 0 && toadd.length === 0) {
      // REmove only
      console.log('Remove compentency only');
      this.removeCompetencies().subscribe(result => {
        this.uxInfosService.showOkay();
      }, error => {
        this.onNotUsefull();
      });

    } else if (toremove.length === 0 && toadd.length !== 0) {
      // Add competencies only
      console.log('Add competency only');
      this.addCompetencies().subscribe(result => {
        this.uxInfosService.showOkay();
      }, error => {
        this.onNotUsefull();
      });
    } else if (toremove.length && toadd.length) {
      // Both, remove then add
      console.log('REmove and add competencies');
      this.removeCompetencies().subscribe(r1 => {
        this.addCompetencies().subscribe(r2 => { }, error => {
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

  add(): boolean {
    if (this.competency && !this.utils.contains(this.compelist, this.competency)) {
      console.log('Add item');
      this.compelist.push(this.competency);
      this.recentlyadded.push(this.competency);
      this.competency = '';
    } else {
      this.uxInfosService.vibrateError();
    }
    return true;
  }

  removeCompetencies() {
    return this.user.removeCompetencies(this.toremove).pipe(
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

  addCompetencies() {
    return this.user.addCompetencies(this.compelist).pipe(
      map(rep => {
        console.log('ADDED.... OK');
        this.updateCompeList();
        this.request = null;
        this.initialCompeSize = this.connected.competencies.length;
        this.recentlyadded = [];
      }, error => {
        // TODO Show error msg. will retry later
        console.log(error);
        this.request = null;
      })
    );
  }

  updateCompeList() {
    this.compelist = [];
    this.connected.competencies.forEach(c => {
      this.compelist.push(c);
      this.existed.push(c);
    });
  }

  openCompetencyChooser() {
    this.router.navigateByUrl('/item-chooser/4');
  }

  onCompetencyModified() {
    this.modification = this.itemModified.competency$.subscribe((value) => {
      this.competency = value;
    });
  }

  back() {
    if (this.request) {
      this.request.unsubscribe();
    }
    this.location.back();
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

    if (this.recentlyadded.length || this.toremove.length) {
      await alert.present();
    } else {
      this.back();
    }
  }

  getCompetenciesToRemove() {
    // These competencies are present in the compelist
    // and are also present in the to remove
    const r = this.utils.allOfIn(this.existed, this.toremove);
    console.log('Competencies to remove');
    console.log(r);
    return r;
  }

  getCompetenciesToAdd() {
    // These competencies are present in the recently added
    // and are not present in the compelist
    let r = this.utils.allOfNotIn(this.recentlyadded, this.toremove);
    // r = this.utils.allOfNotIn(r, this.toremove);
    console.log('Competencies to add');
    console.log(r);
    return r;
  }
}
