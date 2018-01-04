import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoreferralComponent } from './soreferral.component';

describe('SoreferralComponent', () => {
  let component: SoreferralComponent;
  let fixture: ComponentFixture<SoreferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoreferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoreferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
