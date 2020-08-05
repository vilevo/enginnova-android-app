import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemChooserPage } from './item-chooser.page';

describe('ItemChooserPage', () => {
  let component: ItemChooserPage;
  let fixture: ComponentFixture<ItemChooserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemChooserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemChooserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
