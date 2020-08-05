import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenesPresentatorsComponent } from './fenes-presentators.component';

describe('FenesPresentatorsComponent', () => {
  let component: FenesPresentatorsComponent;
  let fixture: ComponentFixture<FenesPresentatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FenesPresentatorsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenesPresentatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
