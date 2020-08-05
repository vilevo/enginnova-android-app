import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroSlidesGuard } from './guards/intro-slides.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'intro',
    loadChildren: './pages/intro-slides/intro-slides.module#IntroSlidesPageModule',
    pathMatch: 'full',
    canActivate: [
      IntroSlidesGuard
    ]
  },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'personal', loadChildren: './pages/personal/personal.module#PersonalPageModule' },
  { path: 'detail/:id', loadChildren: './pages/fenes-member-detail/fenes-member-detail.module#FenesMemberDetailPageModule' },
  { path: 'edit-info-perso', loadChildren: './pages/edit-info-perso/edit-info-perso.module#EditInfoPersoPageModule' },
  { path: 'edit-competency', loadChildren: './pages/edit-competency/edit-competency.module#EditCompetencyPageModule' },
  { path: 'edit-interests', loadChildren: './pages/edit-interests/edit-interests.module#EditInterestsPageModule' },
  { path: 'edit-contacts', loadChildren: './pages/edit-contacts/edit-contacts.module#EditContactsPageModule' },
  { path: 'edit-biography', loadChildren: './pages/edit-biography/edit-biography.module#EditBiographyPageModule' },
  { path: 'work-chooser', loadChildren: './pages/work-chooser/work-chooser.module#WorkChooserPageModule' },
  { path: 'item-chooser/:action', loadChildren: './pages/item-chooser/item-chooser.module#ItemChooserPageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'comment', loadChildren: './pages/comment/comment.module#CommentPageModule' },
  { path: 'liked-member', loadChildren: './pages/liked-member/liked-member.module#LikedMemberPageModule' },
  {
    path: 'conversation',
    loadChildren: './pages/conversation/conversation.module#ConversationPageModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules,
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
