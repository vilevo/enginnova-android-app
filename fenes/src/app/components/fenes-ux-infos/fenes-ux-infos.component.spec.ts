import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenesUxInfosComponent } from './fenes-ux-infos.component';

describe('FenesUxInfosComponent', () => {
  let component: FenesUxInfosComponent;
  let fixture: ComponentFixture<FenesUxInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FenesUxInfosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenesUxInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
