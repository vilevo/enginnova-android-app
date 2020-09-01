import { LazyLoadImageModule } from 'ng-lazyload-image';
import { WaitEmailValidationComponent } from './../../components/wait-email-validation/wait-email-validation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FenesToolbarComponent } from 'src/app/components/fenes-toolbar/fenes-toolbar.component';
import { MaterialModule } from '../material/material.module';
import { IonicModule } from '@ionic/angular';
import { FenesPresentatorsComponent } from 'src/app/components/fenes-presentators/fenes-presentators.component';
import { FenesMemberDetailComponent } from 'src/app/components/fenes-member-detail/fenes-member-detail.component';
import { PipesModule } from '../pipes/pipes.module';
import { BottomComponent } from 'src/app/components/bottom/bottom.component';
import { MostMessagesComponent } from 'src/app/components/most-messages/most-messages.component';
import { MostNewsComponent } from 'src/app/components/most-news/most-news.component';
import { IntersectDirective } from 'src/app/directives/intersect.directive';
import { IntercepterComponent } from 'src/app/components/intercepter/intercepter.component';
import { MostPostsComponent } from "src/app/components/most-posts/most-posts.component";
import { PostComponent } from 'src/app/components/posts/post.component';
import { TopComponent } from 'src/app/components/top/top.component';
import { PopularsComponent } from 'src/app/components/populars/populars.component';
import { MemberPopupComponent } from 'src/app/components/member-popup/member-popup.component';

@NgModule({
  declarations: [
    FenesToolbarComponent,
    FenesPresentatorsComponent,
    FenesToolbarComponent,
    FenesMemberDetailComponent,
    BottomComponent,
    MostMessagesComponent,
    MostNewsComponent,
    MostPostsComponent,
    IntercepterComponent,
    PostComponent,
    TopComponent,
    PopularsComponent,
    MemberPopupComponent,
    WaitEmailValidationComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    MaterialModule,
    LazyLoadImageModule,

  ],
  exports: [
    FenesToolbarComponent,
    FenesPresentatorsComponent,
    FenesMemberDetailComponent,
    BottomComponent,
    MostMessagesComponent,
    MostNewsComponent,
    MostPostsComponent,
    IntercepterComponent,
    PostComponent,
    TopComponent,
    PopularsComponent,
    MemberPopupComponent,
    WaitEmailValidationComponent,
  ]
})
export class AppRootModule { }
