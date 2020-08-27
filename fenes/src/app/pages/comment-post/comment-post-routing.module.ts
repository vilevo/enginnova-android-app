import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentPostPage } from './comment-post.page';

const routes: Routes = [
  {
    path: '',
    component: CommentPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentPostPageRoutingModule {}
