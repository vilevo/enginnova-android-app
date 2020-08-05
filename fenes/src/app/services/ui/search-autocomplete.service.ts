import { Injectable, EventEmitter, ErrorHandler } from '@angular/core';
import { CallBackendService } from '../api/call-backend.service';
import { Subscription } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SearchAutocompleteComponent } from 'src/app/components/search-autocomplete/search-autocomplete.component';
import { NavigateBackService } from './navigate-back.service';

@Injectable({
  providedIn: 'root'
})
export class SearchAutocompleteService {

  start$ = new EventEmitter<boolean>();
  end$ = new EventEmitter<string>();
  competenciesResult$ = new EventEmitter<any>(false);
  // competenciesResult$ = this.competenciesResult.asObservable();


  private overlayRef: OverlayRef;
  private previewPortal: ComponentPortal<any>;

  private currentSearch: Subscription;

  constructor(
    private callBackend: CallBackendService,
    private overlay: Overlay,
    private goBack: NavigateBackService
  ) {
    this.overlayRef = this.overlay.create({
      width: '100%',
      height: 'auto',
      // positionStrategy: this.overlay.position().global().top('9vh'),
      scrollStrategy: this.overlay.scrollStrategies.close(),
      backdropClass: 'search-autocomplete-backdrop',
      hasBackdrop: true,
    });

    this.overlayRef.backdropClick().subscribe(_ => {
      console.log('Backdrop cliked');
      this.closeOverlay();
    });

    this.previewPortal = new ComponentPortal(SearchAutocompleteComponent);

    goBack.event$.subscribe(_ => {
      this.closeOverlay();
    });
  }

  makeCompetencySearch(value: string) {

    if (this.currentSearch) {
      this.currentSearch.unsubscribe();
    }

    console.log('Emit : search start event');
    this.start$.emit(true);

    this.currentSearch = this.callBackend.findCompetencies(value).subscribe(
      next => {
        // console.log(next);

        this.competenciesResult$.emit(next);
        console.log('Emit : result list event');
      },
      error => {
        const value = [];
        this.competenciesResult$.emit(value);
      },

      () => {

        this.start$.emit(false);
      }
    );

  }

  openOverlay() {
    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.previewPortal);
    }
  }

  closeOverlay() {
    this.overlayRef.detach();
    if (this.currentSearch) {
      this.currentSearch.unsubscribe();
      this.currentSearch = null;
    }
  }

  selected(value: string) {
    setTimeout(() => {
      this.closeOverlay();
      this.end$.emit(value);
    }, 200);
  }

}
