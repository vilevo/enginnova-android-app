import { TestBed, async, inject } from '@angular/core/testing';

import { IntroSlidesGuard } from './intro-slides.guard';

describe('IntroSlidesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntroSlidesGuard]
    });
  });

  it('should ...', inject([IntroSlidesGuard], (guard: IntroSlidesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
