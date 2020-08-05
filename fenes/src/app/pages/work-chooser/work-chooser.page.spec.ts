import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkChooserPage } from './work-chooser.page';

describe('WorkChooserPage', () => {
  let component: WorkChooserPage;
  let fixture: ComponentFixture<WorkChooserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkChooserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkChooserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
