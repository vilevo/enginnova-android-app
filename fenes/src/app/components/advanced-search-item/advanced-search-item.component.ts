import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'fenes-advanced-search-item',
  templateUrl: './advanced-search-item.component.html',
  styleUrls: ['./advanced-search-item.component.scss'],
})
export class FenesAdvancedSearchItemComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  slidesOptions = {
    slidesPerView: 4.2,
    initialSlide: 1,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 0,
    freeMode: true,
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
