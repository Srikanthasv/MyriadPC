import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelpriceComponent } from './modelprice.component';

describe('ModelpriceComponent', () => {
  let component: ModelpriceComponent;
  let fixture: ComponentFixture<ModelpriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelpriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
