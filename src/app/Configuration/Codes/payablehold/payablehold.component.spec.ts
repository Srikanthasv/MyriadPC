import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableholdComponent } from './payablehold.component';

describe('PayableholdComponent', () => {
  let component: PayableholdComponent;
  let fixture: ComponentFixture<PayableholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayableholdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayableholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
