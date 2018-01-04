import { TestBed, inject } from '@angular/core/testing';

import { SoreferralService } from './soreferral.service';

describe('SoreferralService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoreferralService]
    });
  });

  it('should be created', inject([SoreferralService], (service: SoreferralService) => {
    expect(service).toBeTruthy();
  }));
});
