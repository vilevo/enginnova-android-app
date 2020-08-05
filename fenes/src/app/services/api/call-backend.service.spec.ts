import { TestBed } from '@angular/core/testing';

import { CallBackendService } from './call-backend.service';

describe('CallBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallBackendService = TestBed.get(CallBackendService);
    expect(service).toBeTruthy();
  });
});
