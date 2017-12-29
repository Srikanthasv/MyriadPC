import { TestBed, inject } from '@angular/core/testing';

import { InventorytranService } from './inventorytran.service';

describe('InventorytranService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventorytranService]
    });
  });

  it('should be created', inject([InventorytranService], (service: InventorytranService) => {
    expect(service).toBeTruthy();
  }));
});
