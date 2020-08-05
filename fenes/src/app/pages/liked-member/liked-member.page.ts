import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FavoriService } from 'src/app/services/favori.service';

@Component({
  selector: 'app-liked-member',
  templateUrl: './liked-member.page.html',
  styleUrls: ['./liked-member.page.scss'],
})
export class LikedMemberPage implements OnInit {
  f = [];
  constructor(
    private location: Location,
    private favori: FavoriService
  ) {

  }

  ngOnInit() {
    this.f = this.favori.all();
    console.log('Favoris');
    console.log(this.f);
  }

  back() {
    this.location.back();
  }


}
