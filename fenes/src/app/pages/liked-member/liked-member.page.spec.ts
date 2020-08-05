import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedMemberPage } from './liked-member.page';

describe('LikedMemberPage', () => {
  let component: LikedMemberPage;
  let fixture: ComponentFixture<LikedMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedMemberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
