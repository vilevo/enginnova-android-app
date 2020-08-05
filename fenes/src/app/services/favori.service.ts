import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { MemberModel } from '../models/member-model';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FavoriService {
  private favoritized: Array<MemberModel> = [];

  constructor(
    private storage: StorageService,
    private platform: Platform
  ) {
    this.platform.ready().then(_ => {
      storage.get('favori').then(favoris => {
        // console.log('Favoris');
        // console.log(favoris);
        if (favoris != null) {
          this.favoritized = JSON.parse(favoris);
        }
      });
    });
  }

  updateFavori() {
    return this.storage.set('favori', JSON.stringify(this.favoritized)).then(_ => {
      console.log('Favori updated');
      console.log(this.favoritized);
      return _;
    }).catch(error => {
      console.log(error);
      return Promise.reject(error);
    });
  }

  favori(member: MemberModel) {
    console.log('Add to the favori : ' + member.id)
    this.favoritized.push(member);
    return this.updateFavori();
  }

  unFavori(id) {
    const index = this.favoritized.findIndex((value) => {
      return value.id == id;
    });

    this.favoritized.splice(index, 1);


    return this.updateFavori();
  }

  isFavoritized(memberId) {
    console.log('Is favoritized');
    console.log(memberId);
    if (this.favoritized.length == 0) {
      return false;
    }
    for (const i of this.favoritized) {
      if (i.id == memberId) {
        return true;
      } else {
        console.log(i.id + '  |  ' + memberId);
      }
    }
    return false;
  }

  all() {
    return this.favoritized;
  }
}
