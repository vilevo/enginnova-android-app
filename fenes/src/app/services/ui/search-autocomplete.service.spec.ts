import { TestBed } from '@angular/core/testing';

import { SearchAutocompleteService } from './search-autocomplete.service';

describe('SearchAutocompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchAutocompleteService = TestBed.get(SearchAutocompleteService);
    expect(service).toBeTruthy();
  });
});
