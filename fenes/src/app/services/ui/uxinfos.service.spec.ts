import { TestBed } from '@angular/core/testing';

import { UXInfosService } from './uxinfos.service';

describe('UXInfosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UXInfosService = TestBed.get(UXInfosService);
    expect(service).toBeTruthy();
  });
});
