import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPostPageRoutingModule } from './comment-post-routing.module';

import { CommentPostPage } from './comment-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentPostPageRoutingModule
  ],
  declarations: [CommentPostPage]
})
export class CommentPostPageModule {}
