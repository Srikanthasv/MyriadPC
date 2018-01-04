import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SodiscountComponent } from './sodiscount.component';

describe('SodiscountComponent', () => {
  let component: SodiscountComponent;
  let fixture: ComponentFixture<SodiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SodiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SodiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
