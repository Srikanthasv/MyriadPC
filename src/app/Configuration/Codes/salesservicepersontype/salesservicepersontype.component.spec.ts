import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesservicepersontypeComponent } from './salesservicepersontype.component';

describe('SalesservicepersontypeComponent', () => {
  let component: SalesservicepersontypeComponent;
  let fixture: ComponentFixture<SalesservicepersontypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesservicepersontypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesservicepersontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
