import { TestBed } from '@angular/core/testing';

import { APIRouteService } from './apiroute.service';

describe('APIRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIRouteService = TestBed.get(APIRouteService);
    expect(service).toBeTruthy();
  });
});
