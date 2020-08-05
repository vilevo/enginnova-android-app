import { TestBed } from '@angular/core/testing';

import { FavoriService } from './favori.service';

describe('FavoriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriService = TestBed.get(FavoriService);
    expect(service).toBeTruthy();
  });
});
