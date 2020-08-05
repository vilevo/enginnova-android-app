import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit, OnDestroy {

  private backbutton: Subscription;
  constructor(
    private location: Location,
    private platform: Platform
  ) {
    // this.platform.ready().then(() => {
    // this.backbutton = platform.backButton.subscribe(() => {
    //   // this.back();
    //   // });
    // });
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.backbutton) {
      // this.backbutton.unsubscribe();
    }
  }


}
