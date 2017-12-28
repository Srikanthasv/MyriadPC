import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorytranComponent } from './inventorytran.component';

describe('InventorytranComponent', () => {
  let component: InventorytranComponent;
  let fixture: ComponentFixture<InventorytranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorytranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorytranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
