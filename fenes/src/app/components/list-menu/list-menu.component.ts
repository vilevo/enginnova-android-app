import { Component, OnInit, Input } from '@angular/core';
import { MemberModel } from 'src/app/models/member-model';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FavoriService } from 'src/app/services/favori.service';
import { APIRouteService } from 'src/app/services/apiroute.service';
import { MessageManagerService } from 'src/app/message-manager.service';
import { UserService } from 'src/app/services/user.service';
import { MatTab, MatTabGroup } from '@angular/material';

@Component({
  selector: 'list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss'],
  animations: [
    trigger('helper', [
      state('show', style({
        width: '75%'
      })),
      state('hide', style({
        width: '0%'
      })),
      transition('show => hide', [
        animate('0.5s'),
      ]),
      transition('hide => show', [
        animate('1s')
      ]),
      transition('* => show', [
        animate('1s')
      ]),
      transition('hide => *', [
        animate('1s')
      ])
    ]),
    trigger('compe', [
      state('add', style({
        transform: 'transitionX(0px)',
        opacity: 1
      })),
      state('hide', style({
        transform: 'transitionX(4px)',
        opacity: 0
      })),
      transition('show => hide', [
        animate('0.5s'),
      ]),
      transition('hide => show', [
        animate('1s')
      ]),
    ])
  ]
})
export class ListMenuComponent implements OnInit {

  @Input() member?: MemberModel;
  start = false;

  loved = false;

  img;

  constructor(
    private utils: UtilitiesService,
    private router: Router,
    private favori: FavoriService,
    private apiRoute: APIRouteService,
    private messageManager: MessageManagerService,
    private user: UserService
  ) {

  }

  ngOnInit() {

    console.log("List memnu for");
    console.log(this.member);

    if (this.member.image) {
      this.img = this.apiRoute.imgRouteBase + this.member.id;

    } else {
      this.img = '/assets/user_1_.png';
    }
    setTimeout(() => {
      if (this.favori.isFavoritized(this.member.id)) {
        console.log('Ahhhhh loved');
        this.loved = true;
      } else {
        console.log('Ahhhhh not loved');
      }

    }, 500);
  }

  go(event: CustomEvent) {
    event.stopPropagation();
    // this.save();
    this.router.navigateByUrl('/detail/' + this.member.id);
  }

  save(event: CustomEvent) {
    event.stopPropagation();
    console.log(this.member);
    this.start = true;
    if (!this.favori.isFavoritized(this.member.id)) {
      this.favori.favori(this.member).then(_ => {
        this.start = false;
        this.loved = true;
        console.log('Ok favori');
      }).catch(error => {
        console.log('Not OK');
        console.log(error);
      });
    } else {
      this.favori.unFavori(this.member.id).then(_ => {
        this.start = false;
        this.loved = false;
        console.log('Ok unfavori');
      }).catch(error => {
        console.log('Not OK');
        console.log(error);
      });
    }
  }

  conversation() {
    this.messageManager.openConversation(this.user.connected.id, this.member.id);
    this.router.navigateByUrl('conversation/' + this.member.id)
  }

}
