import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MemberModel } from 'src/app/models/member-model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wait-email-validation',
  templateUrl: './wait-email-validation.component.html',
  styleUrls: ['./wait-email-validation.component.scss'],
})
export class WaitEmailValidationComponent implements OnInit {

  static cssClass = "wait-email-validation";
  user = new MemberModel();

  wait = false;

  checked = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.userService.getConnected().then(u => {
      this.user = u;
    })
  }

  terminate() {
    this.wait = true;
    this.userService.checkEmailConfirmed().subscribe(checked => {
      this.wait = false;
      this.checked = checked;
      if (checked) {
        this.modalController.dismiss().then(() => {
          this.router.navigateByUrl("/home");
        })
      }

      setTimeout(() => {
        this.checked = null;
      }, 2000);
    })
  }

}
