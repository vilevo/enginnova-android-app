import { TestBed } from '@angular/core/testing';

import { ImagesRetriverService } from './images-retriver.service';

describe('ImagesRetriverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagesRetriverService = TestBed.get(ImagesRetriverService);
    expect(service).toBeTruthy();
  });
});
