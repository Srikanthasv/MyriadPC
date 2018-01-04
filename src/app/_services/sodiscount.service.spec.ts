import { TestBed, inject } from '@angular/core/testing';

import { SodiscountService } from './sodiscount.service';

describe('SodiscountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SodiscountService]
    });
  });

  it('should be created', inject([SodiscountService], (service: SodiscountService) => {
    expect(service).toBeTruthy();
  }));
});
