import { TestBed, inject } from '@angular/core/testing';

import { ModelpriceService } from './modelprice.service';

describe('ModelpriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelpriceService]
    });
  });

  it('should be created', inject([ModelpriceService], (service: ModelpriceService) => {
    expect(service).toBeTruthy();
  }));
});
