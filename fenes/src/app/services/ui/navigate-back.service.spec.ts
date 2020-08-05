import { TestBed } from '@angular/core/testing';

import { NavigateBackService } from './navigate-back.service';

describe('NavigateBackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavigateBackService = TestBed.get(NavigateBackService);
    expect(service).toBeTruthy();
  });
});
