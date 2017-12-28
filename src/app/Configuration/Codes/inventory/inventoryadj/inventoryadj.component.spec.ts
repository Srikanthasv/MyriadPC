import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryadjComponent } from './inventoryadj.component';

describe('InventoryadjComponent', () => {
  let component: InventoryadjComponent;
  let fixture: ComponentFixture<InventoryadjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryadjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryadjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
