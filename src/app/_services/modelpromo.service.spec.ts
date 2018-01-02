import { TestBed, inject } from '@angular/core/testing';

import { ModelpromoService } from './modelpromo.service';

describe('ModelpromoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelpromoService]
    });
  });

  it('should be created', inject([ModelpromoService], (service: ModelpromoService) => {
    expect(service).toBeTruthy();
  }));
});
