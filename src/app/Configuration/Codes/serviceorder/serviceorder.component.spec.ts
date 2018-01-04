import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceorderComponent } from './serviceorder.component';

describe('ServiceorderComponent', () => {
  let component: ServiceorderComponent;
  let fixture: ComponentFixture<ServiceorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
