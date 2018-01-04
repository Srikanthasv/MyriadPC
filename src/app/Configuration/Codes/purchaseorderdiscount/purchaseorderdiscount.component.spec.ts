import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderdiscountComponent } from './purchaseorderdiscount.component';

describe('PurchaseorderdiscountComponent', () => {
  let component: PurchaseorderdiscountComponent;
  let fixture: ComponentFixture<PurchaseorderdiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseorderdiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseorderdiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
