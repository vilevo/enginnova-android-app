import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroSlidesPage } from './intro-slides.page';

describe('IntroSlidesPage', () => {
  let component: IntroSlidesPage;
  let fixture: ComponentFixture<IntroSlidesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroSlidesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroSlidesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
