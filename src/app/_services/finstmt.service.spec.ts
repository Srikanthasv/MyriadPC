import { TestBed, inject } from '@angular/core/testing';

import { FinstmtService } from './finstmt.service';

describe('FinstmtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinstmtService]
    });
  });

  it('should be created', inject([FinstmtService], (service: FinstmtService) => {
    expect(service).toBeTruthy();
  }));
});
