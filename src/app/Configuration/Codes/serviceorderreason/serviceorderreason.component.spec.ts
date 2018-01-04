import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceorderreasonComponent } from './serviceorderreason.component';

describe('ServiceorderreasonComponent', () => {
  let component: ServiceorderreasonComponent;
  let fixture: ComponentFixture<ServiceorderreasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceorderreasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceorderreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
