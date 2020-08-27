import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTextarea } from '@ionic/angular';
import { UXInfosService } from 'src/app/services/ui/uxinfos.service';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.page.html',
  styleUrls: ['./comment-post.page.scss'],
})
export class CommentPostPage implements OnInit {

  comments = [{}, {}, {}, {},]

  @ViewChild('textarea', { read: IonTextarea, static: true }) textarea: IonTextarea;
  constructor(
    private uxInfo: UXInfosService
  ) {
    uxInfo.appBottom.emit('hide');
  }

  ngOnInit() {

    console.log(this.textarea);
  }

}
