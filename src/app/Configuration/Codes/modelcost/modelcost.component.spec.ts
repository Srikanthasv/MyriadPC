import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelcostComponent } from './modelcost.component';

describe('ModelcostComponent', () => {
  let component: ModelcostComponent;
  let fixture: ComponentFixture<ModelcostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelcostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelcostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
