import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityresultComponent } from './opportunityresult.component';

describe('OpportunityresultComponent', () => {
  let component: OpportunityresultComponent;
  let fixture: ComponentFixture<OpportunityresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
