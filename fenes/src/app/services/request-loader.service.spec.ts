import { TestBed } from '@angular/core/testing';

import { RequestLoaderService } from './request-loader.service';

describe('RequestLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestLoaderService = TestBed.get(RequestLoaderService);
    expect(service).toBeTruthy();
  });
});
