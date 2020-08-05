import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestLoaderService, LoaderState } from 'src/app/services/request-loader.service';

@Component({
  selector: 'fenes-request-loader',
  templateUrl: './fenes-request-loader.component.html',
  styleUrls: ['./fenes-request-loader.component.scss'],
})
export class FenesRequestLoaderComponent implements OnInit,OnDestroy {

  show = false
  private subscription: Subscription

  constructor(private loaderService: RequestLoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.show = state.show
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()
  }

}
