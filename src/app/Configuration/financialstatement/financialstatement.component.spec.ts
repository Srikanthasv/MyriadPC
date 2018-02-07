import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialstatementComponent } from './financialstatement.component';

describe('FinancialstatementComponent', () => {
  let component: FinancialstatementComponent;
  let fixture: ComponentFixture<FinancialstatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialstatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
