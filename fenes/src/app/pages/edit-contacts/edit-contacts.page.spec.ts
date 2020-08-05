import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactsPage } from './edit-contacts.page';

describe('EditContactsPage', () => {
  let component: EditContactsPage;
  let fixture: ComponentFixture<EditContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContactsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
