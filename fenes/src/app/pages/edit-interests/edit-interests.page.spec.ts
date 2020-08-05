import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInterestsPage } from './edit-interests.page';

describe('EditInterestsPage', () => {
  let component: EditInterestsPage;
  let fixture: ComponentFixture<EditInterestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInterestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInterestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
