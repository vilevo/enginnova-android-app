import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoPersoPage } from './edit-info-perso.page';

describe('EditInfoPersoPage', () => {
  let component: EditInfoPersoPage;
  let fixture: ComponentFixture<EditInfoPersoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInfoPersoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoPersoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
