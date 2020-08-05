import { TestBed } from '@angular/core/testing';

import { ItemChooserService } from './item-chooser.service';

describe('ItemChooserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemChooserService = TestBed.get(ItemChooserService);
    expect(service).toBeTruthy();
  });
});
