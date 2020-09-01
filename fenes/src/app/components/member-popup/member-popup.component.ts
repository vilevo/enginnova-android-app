import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MemberModel } from 'src/app/models/member-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-popup',
  templateUrl: './member-popup.component.html',
  styleUrls: ['./member-popup.component.scss'],
})
export class MemberPopupComponent implements OnInit {

  @Input() member: MemberModel;

  constructor(
    private popoverController: PopoverController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  see() {
    this.popoverController.dismiss();
    this.router.navigateByUrl('detail/' + this.member.id);
  }

  write() {
    this.popoverController.dismiss();
    this.router.navigateByUrl('conversation/' + this.member.id);
  }

}
