import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemChooserService } from 'src/app/services/ui/item-chooser.service';
import { CallBackendService } from 'src/app/services/api/call-backend.service';
import { Subscription } from 'rxjs';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-item-chooser',
  templateUrl: './item-chooser.page.html',
  styleUrls: ['./item-chooser.page.scss'],
  animations: [
    trigger('choiceArea', [
      state('show', style({
        opacity: 1,
      })),
      state('hide', style({
        opacity: 0.5,
      })),
      transition('* => *', [
        animate('0.5s'),
      ]),
    ])
  ]
})
export class ItemChooserPage implements OnInit, OnDestroy {

  value;
  searchForm: FormGroup;
  action: number;
  // ACTION 1: WORK
  // ACTION 2: ENTERPRISE
  // ACTION 3: QUARTER
  // ACTION 4: COMPETENCY
  // ACTION 5: INTEREST
  request: Subscription;

  choices: Array<string>;

  constructor(
    private fb: FormBuilder,
    private statusBar: StatusBar,
    private platform: Platform,
    private location: Location,
    private route: ActivatedRoute,
    private itemChoosed: ItemChooserService,
    private backend: CallBackendService,
    private uxInfos: UXInfosService
  ) {
    this.action = 0;
    this.choices = [];

    this.route.params.subscribe(params => {
      console.log(params);
      this.action = params.action;
      console.log('Action : ' + this.action);
      this.value = '*';
      this.fetch();
      // this.setFirstActions();
    });
    this.searchForm = this.fb.group({
      searchInput: ['']
    });
    this.searchForm.get('searchInput').valueChanges.subscribe((value) => {
      this.value = value;
      if (value.length) {
        this.fetch();
      } else {
        this.uxInfos.hide();
        if (this.request) {
          this.request.unsubscribe();
          this.request = null;
        }
      }
    });
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByName('black');
    });
  }

  ngOnDestroy() {
    this.statusBar.backgroundColorByHexString('#0059ff');
  }

  forceChoose() {
    const value = this.searchForm.get('searchInput').value;
    this.choose(value);
  }

  choose(value: string) {
    setTimeout(() => {
      if (value.length !== 0) {
        // tslint:disable-next-line: triple-equals
        if (this.action == 1) {
          console.log('Work this value: ' + value);
          this.itemChoosed.emitWork(value);
          // tslint:disable-next-line: triple-equals
        } else if (this.action == 2) {
          console.log('Enterprise this value: ' + value);
          this.itemChoosed.emitEnterprise(value);
          // tslint:disable-next-line: triple-equals
        } else if (this.action == 3) {
          console.log('Quarter this value: ' + value);
          this.itemChoosed.emitQuarter(value);
          // tslint:disable-next-line: triple-equals
        } else if (this.action == 4) {
          console.log('Competency this value: ' + value);
          this.itemChoosed.emitCompetency(value);
          // tslint:disable-next-line: triple-equals
        } else if (this.action == 5) {
          console.log('interest this value: ' + value);
          this.itemChoosed.emitInterest(value);
        }
      }
    }, 500);
    setTimeout(() => {
      this.goBack();
    }, 200);
  }

  goBack() {
    this.location.back();
  }

  fetch() {
    if (this.request) {
      this.request.unsubscribe();
    }

    this.uxInfos.startLoading();

    // tslint:disable-next-line: triple-equals
    if (this.action == 1) {
      this.fetchWorks();
      // tslint:disable-next-line: triple-equals
    } else if (this.action == 2) {
      this.fetchEnterprise();
      // tslint:disable-next-line: triple-equals
    } else if (this.action == 3) {
      this.fetchQuarter();
      // tslint:disable-next-line: triple-equals
    } else if (this.action == 4) {
      this.fetchCompetency();
      // tslint:disable-next-line: triple-equals
    } else if (this.action == 5) {
      this.fetchInterests();
    }
  }

  onError() {
    setTimeout(() => {
      this.uxInfos.showError('Erreur inconnue');
    }, 500);
  }

  fetchWorks() {
    this.request = this.backend.findWorks(this.value).subscribe(
      (value: string[]) => {
        this.choices = value;
        setTimeout(() => {
          this.uxInfos.stopLoading();
        }, 500);
      }, error => {
        this.onError();
      });
  }

  fetchEnterprise() {
    this.request = this.backend.findEnterprise(this.value).subscribe(
      (value: string[]) => {
        this.choices = value;
        setTimeout(() => {
          this.uxInfos.stopLoading();
        }, 500);
      }, error => {
        this.onError();
      });
  }

  fetchQuarter() {
    this.request = this.backend.findQuarter(this.value).subscribe(
      (value: string[]) => {
        this.choices = value;
        setTimeout(() => {
          this.uxInfos.stopLoading();
        }, 500);
      }, error => {
        this.onError();
      });
  }

  fetchCompetency() {
    this.request = this.backend.findCompetencies(this.value).subscribe(
      (value: string[]) => {
        this.choices = value;
        setTimeout(() => {
          this.uxInfos.stopLoading();
        }, 500);
      }, error => {
        this.onError();
      });
  }

  fetchInterests() {
    this.request = this.backend.findInterests(this.value).subscribe(
      (value: string[]) => {
        this.choices = value;
        setTimeout(() => {
          this.uxInfos.stopLoading();
        }, 500);
      }, error => {
        this.onError();
      });
  }

  setFirstActions() {
    // tslint:disable-next-line: triple-equals
    if (this.action == 1) {
      this.choices = [
        'Etudiant',
        'Designer',
        'CEO',
        'Comptable'
      ];
      // tslint:disable-next-line: triple-equals
    } else if (this.action == 2) {
      this.choices = [
        'CIC',
        'Togocel',
        'Enginnova',
        'Google'
      ];
      // tslint:disable-next-line: triple-equals
    } else if (this.action == 3) {
      this.choices = [
        'Agoè Atchanvé',
        'Dekon',
        'Adidogomé',
        'Amoutivé'
      ];
      // tslint:disable-next-line: triple-equals
    } else if (this.action == 4) {
      this.choices = [
        'Programmeur',
        'Design',
        'Piano',
        'Langue'
      ];
      // tslint:disable-next-line: triple-equals
    } else if (this.action == 5) {
      this.choices = [
        'Programmeur',
        'Design',
        'Piano',
        'Langue'
      ];
    }
  }
}
