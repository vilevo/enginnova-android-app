import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MemberModel } from 'src/app/models/member-model';
import { StorageService } from 'src/app/services/storage.service';
import { CallBackendService } from 'src/app/services/api/call-backend.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastController } from '@ionic/angular';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ConnectionErrorPaneComponent } from 'src/app/components/connection-error-pane/connection-error-pane.component';
import { Subscription } from 'rxjs';
import { InternetService } from 'src/app/services/internet.service';

@Component({
  selector: 'app-fenes-member-detail',
  templateUrl: './fenes-member-detail.page.html',
  styleUrls: ['./fenes-member-detail.page.scss'],
})
export class FenesMemberDetailPage implements OnInit, AfterViewInit, OnDestroy {
  public member: MemberModel;
  public show = false;
  showError = false;
  public id;

  private connectionStatus: Subscription;

  @ViewChild('connection-error-pane', { read: ConnectionErrorPaneComponent, static: false }) connectErrPane: ConnectionErrorPaneComponent;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private storage: StorageService,
    private callBackend: CallBackendService,
    private ngxSpinner: NgxSpinnerService,
    private toastController: ToastController,
    private utils: UtilitiesService,
    private hasInternet: InternetService,
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.id = params.id;
    });
  }

  ngOnInit() {

    this.connectionStatus = this.hasInternet.connectionStatus$.subscribe(
      next => {
        if (next.connected) {
          this.showError = false;
        } else {
          this.showError = true;
        }
      }
    );

    this.show = false;
    // this.ngxSpinner.show();

    this.fetchUser();
  }

  fetchUser() {
    this.member = this.utils.fakeMember();
    this.callBackend.getParticipant(this.id).subscribe((member) => {
      this.member = member;
      this.show = true;
      console.log('HIde the spinner');
      this.ngxSpinner.hide();
    }, (error) => {
      console.log('Set showError to true');
      // this.presentToast('Connectez-vous à internet et ressayez');
      this.member = this.utils.fakeMember();
      this.show = false;
      this.showError = true;
      // setTimeout(() => {
      //   // this.ngxSpinner.hide();
      //   // this.location.back();
      // }, 1000);
    });
  }

  back() {
    // this.router.navigateByUrl('/home');
    this.location.back();
  }

  ngAfterViewInit(): void {

  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      animated: true,
      translucent: true,
      cssClass: 'detail-failed',
      color: '#8a2be2',

    });
    toast.present();
  }

  ngOnDestroy(): void {
    this.connectionStatus.unsubscribe();
  }

}
