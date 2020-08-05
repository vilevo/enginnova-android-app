import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompetencyPage } from './edit-competency.page';

describe('EditCompetencyPage', () => {
  let component: EditCompetencyPage;
  let fixture: ComponentFixture<EditCompetencyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompetencyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompetencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
