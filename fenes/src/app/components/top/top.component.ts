import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {

  connected = null;

  constructor(
    private router: Router,
    private user: UserService
  ) {

  }

  ngOnInit() {
    this.connected = this.user.getConnected().then((m) => {
      console.log("TOP: connected user")
      console.log(m)
      this.connected = m;
    });
  }

  editCompet() {
    this.router.navigateByUrl('edit-competency');
  }

  editInterest() {
    this.router.navigateByUrl('edit-interests')

  }

}
