import { TestBed, inject } from '@angular/core/testing';

import { OpportunityresultService } from './opportunityresult.service';

describe('OpportunityresultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpportunityresultService]
    });
  });

  it('should be created', inject([OpportunityresultService], (service: OpportunityresultService) => {
    expect(service).toBeTruthy();
  }));
});
