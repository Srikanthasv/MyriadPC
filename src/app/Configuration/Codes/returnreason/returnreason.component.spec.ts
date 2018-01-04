import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnreasonComponent } from './returnreason.component';

describe('ReturnreasonComponent', () => {
  let component: ReturnreasonComponent;
  let fixture: ComponentFixture<ReturnreasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnreasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
