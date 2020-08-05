import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenesMemberDetailPage } from './fenes-member-detail.page';

describe('FenesMemberDetailPage', () => {
  let component: FenesMemberDetailPage;
  let fixture: ComponentFixture<FenesMemberDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FenesMemberDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenesMemberDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
