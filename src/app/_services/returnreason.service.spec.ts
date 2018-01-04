import { TestBed, inject } from '@angular/core/testing';

import { ReturnreasonService } from './returnreason.service';

describe('ReturnreasonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReturnreasonService]
    });
  });

  it('should be created', inject([ReturnreasonService], (service: ReturnreasonService) => {
    expect(service).toBeTruthy();
  }));
});
