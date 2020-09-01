import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
// import { CanActivate } from '@angular/router/src/utils';
import { UserService } from '../services/user.service';
import { Platform } from '@angular/cdk/platform';
import { IonBackButton } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IntroSlidesGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor
    (
      private router: Router,
      private userService: UserService,
      private _platform: Platform
    ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log('In the guard')
    const connected = await this.userService.getConnected();
    console.log('Connected : ' + connected);
    if (connected != null) {
      console.log('Connected or this is a browser go to the home page');

      if (connected.email_validated_at != null) {
        this.router.navigateByUrl('/sign-up');
        console.log('GO TO HOME');
        return false;
      }

      this.router.navigateByUrl('/home');
      console.log('GO TO HOME');
      return false;
    }
    console.log('PHONE: Not connected, returning to intro');
    console.log('GUARD END');
    return true;
  }
}
