import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBiographyPage } from './edit-biography.page';

describe('EditBiographyPage', () => {
  let component: EditBiographyPage;
  let fixture: ComponentFixture<EditBiographyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBiographyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBiographyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
