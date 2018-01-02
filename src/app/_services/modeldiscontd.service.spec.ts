import { TestBed, inject } from '@angular/core/testing';

import { ModeldiscontdService } from './modeldiscontd.service';

describe('ModeldiscontdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModeldiscontdService]
    });
  });

  it('should be created', inject([ModeldiscontdService], (service: ModeldiscontdService) => {
    expect(service).toBeTruthy();
  }));
});
